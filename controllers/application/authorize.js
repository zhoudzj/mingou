const {AppError} = require('ch-error');
const Cache = require('../../controllers/common/cache');

const Mysql = global.Mysql;
const Op = Mysql.Op;
const userModel = Mysql.models.user;
const redis = global.Redis;

module.exports = {
    //密码登陆
    async loginByPassword(ctx) {
        let attributes = ctx.request.body;
        let options = { mobile: attributes.mobile, area: attributes.area };
        if (attributes.type === 'email') options = { email: attributes.email };
        let user = await userModel.findOne({
            where: options,
            raw: true
        });
        if (!user) throw new AppError(11004, '用户不存在');
        if (!user.password) throw new AppError(11005, '请用验证码登陆');
        let pwd = User.decryptPassword(attributes.password);
        let pwdHash = Helper.Md5(pwd, user.salt);
        if (pwdHash !== user.password) throw new AppError(11006, '密码错误');
        let token = await Cache.setTokenInfo(user);
        ctx.body.data = { token };
    },

    //退出登陆
    async signOut(ctx) {
        let token = ctx.request.identity.token;
        await Cache.deleteTokenInfo(token);
    },
}


