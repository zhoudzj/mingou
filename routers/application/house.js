const house = global.Controller.house;

module.exports = {
    prefix: 'house',         //模块路由前缀(默认:'', 无前缀)
    routes: [           //路由列表(默认:[], 无路由)
        {
            description: '获取社区信息',    //资源描述(默认:'')
            path: 'list',           //请求路径(默认:'/')
            method: 'get',         //请求方法(必填项, 支持get,post等标准方法)
            validator: {        //参数验证(默认:null. 依赖"ch-validator"模块, 欢迎提供意见,下为举例)
                // 'id': ['用户编号', 'required', 'integer', {'min': 1000}],
                // 'school': ['学校', 'string', {'default': '杭州学军中学'}]
            },
            controller: house.find    //可以使用预先加载的CONTROLLER_PATH中的函数, 当然也可以传入函数。
        }
    ]
};