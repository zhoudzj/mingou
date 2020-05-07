'use strict'
const _ = require('lodash');
const common = require('./common');

const config = {
    Mysql: {
        min_connection: 3 //最小空闲连接数
    },
    App: {
        port: 6000,                 //对外监听端口(默认:6000, 可修改)
        path: '.',                  //项目根目录(默认:node_modules同级目录, 可修改)
        subpath: 'application',                //应用子目录(默认:'', 没有子目录)
        proxy: true,                //是否使用反向代理(默认:true, 通过X-Forwarded-For获取客户端ip, 前面需配合Nginx)
        prefix: null,               //通用路由前缀(默认:'')
        debug: false,               //是否开启调试模式(默认:false. 设置true, 记录每条错误请求)
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
        middlewares: [{             //中间件配置(默认:[], 无中间件. 多个中间件按配置顺序挂载)
            file: 'token',              //中间件文件名(必选)
            switch: true,               //中间件开关(默认:true)
            TokenName: 'Auth-Token'     //中间件自定义参数(可选)
        }],
        i18n: false,                //是否支持国际化提示(默认:false, 只支持返回程序中new ch-error中的填写的message错误提示. 
        maintenance: false,         //是否系统维护中(默认:false)
        ips: [],                    //访问IP白名单(默认:[], 无限制)
        unips: [],                  //访问IP黑名单(默认:[]], 无限制)
        closes: [],                 //关闭的路由服务(默认:[], 都可访问)
        TASK_PATH: 'path/tasks[/subpath]',              //默认初始化任务目录, 可修改可空
        MIDDLEWARE_PATH: 'path/middlewares[/subpath]',  //默认中间件目录, 可修改可空
        CONTROLLER_PATH: 'path/controllers[/subpath]',  //默认控制器(业务逻辑)目录, 可修改可空
        ROUTE_PATH: 'path/routes[/subpath]',            //默认路由目录, 可修改可空
        MESSAGE_PATH: 'path/messages[/subpath]',        //默认国际化提示目录, 可修改可空
        LOG_PATH: 'path/logs[/subpath]',                //默认日志目录, 可修改, 开启若不存在会自动创建
        STATIC_PATH: 'path/public[/subpath]'        //默认静态文件托管目录, 可修改, 开启若不存在会自动创建
    }
};

module.exports = global.Config = _.merge(common, config);