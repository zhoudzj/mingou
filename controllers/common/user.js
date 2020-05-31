'use strict';

const moment = require('moment');
const NodeRSA = require('node-rsa');
const {AppError} = require('vendor/error');
const Config = global.Config.Logic;

module.exports = {
    //加密用户信息
    encryInfo(userInfo) {
        userInfo.mobile_encry = '';
        userInfo.email_encry = '';
        if (userInfo.mobile) {
            userInfo.mobile_encry = userInfo.mobile.slice(0, 3) + '****' + userInfo.mobile.slice(-4);
        }
        if (userInfo.email) {
            let t = userInfo.email.indexOf('@');
            if (t < 4) userInfo.email_encry = userInfo.email.slice(0, 1) + '**' + userInfo.email.slice(t);
            else userInfo.email_encry = userInfo.email.slice(0, parseInt(t/2)) + '****' + userInfo.email.slice(t);
        }
        return userInfo;
    },

    //解密用户密码
    decryptPassword(text) {
        const rsaKey = new NodeRSA(Config.PrivateKey, {encryptionScheme: 'pkcs1'});
        let content = rsaKey.decrypt(text, 'utf8');
        let l = content.split(':');
        if (l.length > 2) throw new AppError(10002, '密码中不能包含冒号');
        else if (l.length <= 1) throw new AppError(10003, '无效请求');
        let time = Number(l[1].slice(0, 10));
        if (! time || isNaN(time)) throw new AppError(10003, '无效请求');
        let now = moment().unix();
        if (now - time > 60) throw new AppError(10004, '过期请求');
        return l[0];
    }
};