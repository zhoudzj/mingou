const ctl = global.Controller.authorize;

module.exports = {
    prefix: 'user',         //模块路由前缀(默认:'', 无前缀)
    routes: [        //路由列表(默认:[], 无路由)
        {
            description: '密码登录',    //资源描述(默认:'')
            path: 'login',           //请求路径(默认:'/')
            method: 'post',         //请求方法(必填项, 支持get,post等标准方法)
            validator: {        //参数验证(默认:null. 依赖"ch-validator"模块, 欢迎提供意见,下为举例)
                'userName': ['用户名', 'required', 'string'],
                'password': ['密码', 'required','string']
            },
            controller: ctl.loginByPassword    //可以使用预先加载的CONTROLLER_PATH中的函数, 当然也可以传入函数。
        },
        {
            description: '账户注册',    //资源描述(默认:'')
            path: 'register',           //请求路径(默认:'/')
            method: 'post',         //请求方法(必填项, 支持get,post等标准方法)
            validator: {        //参数验证(默认:null. 依赖"ch-validator"模块, 欢迎提供意见,下为举例)
                'userName': ['用户名', 'required', 'string'],
                'password': ['密码','required','string',]
            },
            controller: ctl.registerByPassword
        },
        {
            description: '获取登录用户信息',    //资源描述(默认:'')
            path: 'getUserInfo',           //请求路径(默认:'/')
            method: 'post',         //请求方法(必填项, 支持get,post等标准方法)
            validator: {        //参数验证(默认:null. 依赖"ch-validator"模块, 欢迎提供意见,下为举例)
                'userName': ['用户名', 'required', 'string'],
                'password': ['密码','required','string',]
            },
            controller: ctl.getUserInfo
        },
        {
            description: '退出登录',
            path: 'logout',
            method: 'post',
            controller: ctl.signOut
        }
    ]
};
