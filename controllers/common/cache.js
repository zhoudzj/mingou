'use strict';

const _ = require('lodash');
const moment = require('moment');
const log4js = require('log4js');
const {AppError, SystemError} = require('ch-error');

const Logger = log4js.getLogger('Cache:');
const Redis = global.Redis;
const TOKEN_TIME = process.env.TOKEN_TIME || 86400 * 3;
const Key_User = 'user_';
const NODE_ENV = process.env.NODE_ENV || 'production';

function cashUserInfo(key, cacheInfo) {
    let value = JSON.stringify(cacheInfo);
    return Redis.set(key, value, 'EX', TOKEN_TIME);
}

async function checkLockAction(key) {
    let rs = await Redis.setnx(key, 'yes');
    if (! rs) return false;
    await Redis.expire(key, 60);
    return true;
}

module.exports = {
    //获取缓存Token信息
    async getTokenInfo(token) {
        let key = Key_User + token;
        let value = await Redis.get(key);
        if (! value) return null;
        try {
            value = JSON.parse(value);
        } catch(e) {
            Logger.error(`缓存信息解析失败, key: ${key}, value: ${value}, message: ${e.message}`);
            throw new SystemError('缓存信息解析失败');
        }
        let now = moment().unix();
        if (value.expires - now < 86400) {
            await Redis.expire(key, TOKEN_TIME);
        }
        return value;
    },
    //设置Token缓存信息
    async setTokenInfo(token, user) {
        const now = moment().unix();
        if (! user || _.isEmpty(user)) throw new SystemError('缓存信息为空');
        let cacheInfo = {
            id: user.id,
            type: user.type,
            partner: user.partner,
            is_initator: user.is_initator,
            inviter: user.inviter,
            invite_code: user.invite_code,
            name: user.name || '',
            id_number_last_six: user.id_number_last_six || '',
            area: user.area,
            mobile: user.mobile || '',
            email: user.email || '',
            identify_status: user.identify_status,
            add_time: now,
            expires: now + TOKEN_TIME
        };
        await cashUserInfo(Key_User + token, cacheInfo);
        return token;
    },
    //更新Token缓存信息
    updateTokenInfo(identity) {
        return cashUserInfo(Key_User + identity.token, identity);
    },
    //清除Token缓存
    async deleteTokenInfo(token) {
        return Redis.del(Key_User + token);
    },

    //缓存验证码
    async setVerification(key) {
        let value = await Redis.get(key);
        if (value) throw new AppError(2001, '验证码请求频繁');
        let code = _.random(1000, 9999);
        await Redis.set(key, code, 'EX', 65);
        return code;
    },
    //校验验证码
    async checkVerification(key, code) {
        let value = await Redis.get(key);
        if (! value) throw new AppError(2002, '验证码已失效');
        if (NODE_ENV === 'development') value = code;
        if (value != code) throw new AppError(2003, '验证码错误');
        return Redis.del(key);
    },

    //获取Token列表
    getTokens() {
        return Redis.lrange('token_list', [0 , -1]);
    },
    //设置Token列表
    setTokens(v) {
        return Redis.rpush('token_list', v);
    },

    //获取信息发送次数
    async getVerifiTime(key) {
        let v = await Redis.get(key);
        if (! v) return 0;
        else {
            let vv = v.split(':');
            if (vv.length < 2) throw new SystemError('信息次数解析失败');
            let today = moment().format('YYYY-MM-DD');
            if (today > vv[0]) {
                await Redis.del(key);
                return 0;
            }
            return Number(vv[1]);
        }
    },
    //保存信息发送次数
    setVerifiTime(key, num) {
        let today = moment().format('YYYY-MM-DD');
        let v = `${today}:${num}`;
        return Redis.set(key, v, 'EX', 86400);
    },

    //缓存汇率
    setRate(target, base, rate, expires = 60) {
        let key = `coin_rate_${target}_${base}`;
        return Redis.set(key, rate, 'EX', expires);
    },
    //获取最新汇率
    getRate(target, base) {
        let key = `coin_rate_${target}_${base}`;
        return Redis.get(key);
    },

    //订单价格锁定
    lockOrderAmount(orderId, token, amount, expires = 60) {
        let key = `lock_order_${orderId}_${token}`;
        return Redis.set(key, amount, 'EX', expires);
    },
    //获取最新汇率
    getOrderAmount(orderId, token) {
        let key = `lock_order_${orderId}_${token}`;
        return Redis.get(key);
    },

    //解决用户注册问题
    checkRegistering(uid) {
        let key = 'register_' + uid;
        return checkLockAction(key);
    }
};
