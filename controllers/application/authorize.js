const {AppError} = require('ch-error');
const Cache = require('../../controllers/common/cache');

const Mysql = global.Mysql;
const Op = Mysql.Op;
const userModel = Mysql.models.user;
const redis = global.Redis;

module.exports = {
    //密码登录
    async loginByPassword(ctx) {
        let attributes = ctx.request.body;
        console.log('==========',ctx.request.body);
        let options = { name: attributes.userName, password: attributes.password };
        if (attributes.type === 'email') options = { email: attributes.email };
        let user = await userModel.findOne({
            where: options,
            raw: true
        });
        if (!user) throw new AppError(11004, '用户不存在');
        // let pwd = User.decryptPassword(attributes.password);
        // let pwdHash = Helper.Md5(pwd, user.salt);
        // if (pwdHash !== user.password) throw new AppError(11006, '密码错误');
        // let token = await Cache.setTokenInfo(user);
        console.warn('xx==xx==',token);
        ctx.body.data = { token };
    },
    async registerByPassword(ctx) {
        console.log('==========',ctx.request.body);
        let attributes = ctx.request.body;
    },
    //退出登录
    async signOut(ctx) {
        let token = ctx.request.identity.token;
        await Cache.deleteTokenInfo(token);
    },
}


