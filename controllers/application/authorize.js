const {AppError} = require('ch-error');
const Helper = require('ch-vendor/helper');

const Cache = require('../../controllers/common/cache');
const moment = require('moment');

const Mysql = global.Mysql;
const Op = Mysql.Op;
const userModel = Mysql.models.user;
const redis = global.Redis;

module.exports = {
    //密码登录
    async loginByPassword(ctx) {
        let attributes = ctx.request.body;
        console.log('==========', ctx.request.body);
        let options = {
            name: attributes.userName
        };
        let user = await userModel.findOne({where: options, raw: true});
        if (!user) 
            throw new AppError(11004, '用户不存在');
        let pwdHash = Helper.Md5(attributes.password, user.salt);
        if (pwdHash !== user.password) 
            throw new AppError(11006, '密码错误');
        console.log('==========', user);
        let token = await Cache.setTokenInfo(user);
        console.warn('xx==xx==', token);
        ctx.body.data = {
            token
        };
    },
    //用户密码注册
    async registerByPassword(ctx) {
        let attributes = ctx.request.body;
        let now = moment().unix();

        let salt = Math
            .random()
            .toString(32)
            .substr(2, 10);
        let pwdHash = Helper.Md5(attributes.password, salt);
        try {
            let result = await userModel.create({name: attributes.userName, password: pwdHash, type: userModel.TYPE_NORMAL, salt, add_time: now});
            console.log(result);
            ctx.body.data = {};

            if (!result) 
                throw new AppError(11004, '注册失败');
            }
        catch (error) {
            if(error.name === 'SequelizeUniqueConstraintError'){
                throw new AppError(11001, '用户名已存在');
            };
        }
    },
    async getUserInfo(ctx) {},
    //退出登录
    async signOut(ctx) {
        console.log(ctx.request.identity);
        let token = ctx.request.identity.token;
        await Cache.deleteTokenInfo(token);
    }
}
