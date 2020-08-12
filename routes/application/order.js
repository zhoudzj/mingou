const ctl = global.Controller.order;

module.exports = {
    prefix: 'order',         //模块路由前缀(默认:'', 无前缀)
    routes: [           //路由列表(默认:[], 无路由)
        {
            description: '生成订单',    //资源描述(默认:'')
            path: 'create',           //请求路径(默认:'/')
            method: 'post',         //请求方法(必填项, 支持get,post等标准方法)
            validator: {        //参数验证(默认:null. 依赖"ch-validator"模块, 欢迎提供意见,下为举例)
                'list': ['订单列表', 'required', 'array'],
                'salesman': ['销售名称','required','string'],
                'room': ['户号','required','string'],
                'comunityName': ['社区名','required','string'],
                'name': ['姓名','required','string'],
                'style': ['户型','required','string']
            },
            controller: ctl.create    //可以使用预先加载的CONTROLLER_PATH中的函数, 当然也可以传入函数。
        },
        {
            description: '订单查询',    //订单查询
            path: 'list',
            method: 'get',
            validator: {
            },
            controller: ctl.find
        },
        {
            description: '订单详情',    //订单查询
            path: 'detail',
            method: 'post',
            validator: {
                'orderId': ['订单号','required','string']
            },
            controller: ctl.detail
        },
        {
            description: '删除订单',
            path: 'remove',
            method: 'post',
            validator: {
                'orderId': ['订单号','required','string']
            },
            controller: ctl.remove
        },
        {
            description: '生成pdf',
            path: 'createPdf',
            method: 'post',
            validator: {
                'url': ['pdf','required','string']
            },
            controller: ctl.createPdf
        }
    ]
};