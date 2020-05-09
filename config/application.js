'use strict'
const _ = require('lodash');
const common = require('./common');

const config = {
    Mysql: {
        min_connection: 3 //最小空闲连接数
    },
    App: {
        port: 6000,                 //对外监听端口(默认:6000, 可修改)
        subpath: 'application',                //应用子目录(默认:'', 没有子目录)
        cors: {                     //是否在程序中处理跨域(默认:全过. 可以设置为false, 在Nginx中处理)
            origin: '*',                //是否限制请求来源(默认:'*'. 可以支持多个域名, 以逗号隔开)
            maxAge: 3600                //options检测过期时间(默认:3600秒)
        },
        log: {                      //日志配置(默认:保存文件. 可设置为false, 只在控制台打印, 不保存文件)
            fileName: 'app',            //文件名(默认:产生普通日志按日保存文件app.2019-12-14.log和异常日志文件app-error.log.
            //若用pm2集群发布, 普通日志将自动按集群编号标记分开保存, eg: app-1.2019-14-14.log)
            isCompress: false,          //历史是否压缩(默认:false, 不压缩. 若日志产生较多, 建议设置true, 对历史日志进行压缩保存)
            keepDays: 30                //历史日志保存天数(默认:30)
        },// eg: {Mysql: sequelize}, 再任意地方使用ctx.Mysql.getModel('user')或global.Mysql.query)
        middlewares: [{                //中间件配置(默认:[], 无中间件. 多个中间件按配置顺序挂载)
            file: 'token',              //中间件文件名(必选)
            switch: true,               //中间件开关(默认:true)
            TokenName: 'Auth-Token'     //中间件自定义参数(可选)
        }]
    }
};

module.exports = global.Config = _.merge(common, config);