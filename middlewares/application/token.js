'use strict';

const {AppError} = require('ch-error');
const Cache = require('../../controllers/common/cache');

//不强制校验token路由列表
const Exception_Routes = [
    '/user/register',
    '/user/login',
];

module.exports = (app, config) => {
    app.use(async (ctx, next) => {
        if (! ctx.get(config.TokenName) || (typeof ctx.get(config.TokenName) !== 'string')) {
            if (! Exception_Routes.includes(ctx.path)) throw new AppError(1301, '请先登录');
            else await next();
            return;
        }
        let requestToken = ctx.get(config.TokenName);
        let userInfo = await Cache.getTokenInfo(requestToken);
        if (! userInfo) throw new AppError(1302, 'Token超时, 请重新登录');
        ctx.request.identity = userInfo;
        ctx.request.identity.token = requestToken;
        await next();
    });
};