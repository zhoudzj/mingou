const ctl = global.Controller.product;

module.exports = {
    prefix: 'product',         //模块路由前缀(默认:'', 无前缀)
    routes: [           //路由列表(默认:[], 无路由)
        {
            description: '获取商品列表',    //资源描述(默认:'')
            path: 'list',           //请求路径(默认:'/')
            method: 'post',         //请求方法(必填项, 支持get,post等标准方法)
            validator: {        //参数验证(默认:null. 依赖"ch-validator"模块, 欢迎提供意见,下为举例)
                'id': ['户型编号', 'required', 'integer', {'min': 100}],
            },
            controller: ctl.find    //可以使用预先加载的CONTROLLER_PATH中的函数, 当然也可以传入函数。
        },
    ]
};