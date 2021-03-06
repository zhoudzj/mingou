const ctl = global.Controller.house;

module.exports = {
    prefix: 'house',         //模块路由前缀(默认:'', 无前缀)
    routes: [           //路由列表(默认:[], 无路由)
        {
            description: '查询房号',    //资源描述(默认:'')
            path: 'list',           //请求路径(默认:'/')
            method: 'post',         //请求方法(必填项, 支持get,post等标准方法)
            validator: {        //参数验证(默认:null. 依赖"ch-validator"模块, 欢迎提供意见,下为举例)
                'communityId': ['社区id', 'required', 'integer', {'min': 1}],
            },
            controller: ctl.list    //可以使用预先加载的CONTROLLER_PATH中的函数, 当然也可以传入函数。
        },
    ]
};