const {AppError, SystemError} = require('ch-error');
const puppeteer = require('puppeteer');
const path = require('path');

const Mysql = global.Mysql;
const Op = Mysql.Op;
const orderModel = Mysql.models.order;
const OrderProduct = Mysql.models.Order_Product;
const productModel = Mysql.models.product;

const redis = global.Redis;

module.exports = {
    //支持的token列表
    async create(ctx) {
        let attributes = ctx.attributes;
        const useInfo = ctx.request.identity;
        try {
            const result = await orderModel.create({
                project_name: attributes.comunityName,
                style_name: attributes.style,
                house_num: attributes.room,
                master_name: attributes.name,
                sales_name: attributes.salesman,
                user_id: useInfo.id,
                create_time: new Date().getTime()
            });
            const newList = attributes
                .list
                .map(item => {
                    const obj = {};
                    obj.productId = item.id;
                    obj.orderId = result.id;
                    obj.number = item.number;
                    obj.itemColor = item.color;
                    return obj
                });
            console.log(newList);

            ctx.body.data = await OrderProduct.bulkCreate(newList);
        } catch (e) {
            console.log(e);
            if (e.name === 'SequelizeForeignKeyConstraintError') {
                throw new AppError(12000, '用户不存在');
            }
        }
    },
    async find(ctx) {
        let attributes = ctx.attributes;
        const useInfo = ctx.request.identity;
        try {
            ctx.body.data = await orderModel.findAll({
                order:[['create_time','DESC']],
                where: {
                    user_id: useInfo.id
                },
                raw: true
            });
        } catch (e) {}
    },
    async detail(ctx) {
        let attributes = ctx.attributes;
        try {
            const result = await OrderProduct.findAll({
                include: productModel,
                where: {
                    orderId: attributes.orderId
                },
                raw: true
            });
            console.log(result);
            ctx.body.data = result.map(item => {
                const obj = {};
                Object
                    .keys(item)
                    .forEach(key => {
                        const arr = key.split('.');
                        const property = arr[arr.length - 1]
                        console.log(property);
                        if ([
                            'id',
                            'number',
                            'typeId',
                            'type',
                            'groupId',
                            'childId',
                            'name',
                            'brand',
                            'model',
                            'price',
                            'unit',
                            'default',
                            'itemColor'
                        ].includes(property)) {
                            obj[property] = item[key]
                        }
                    })
                return obj;
            });
        } catch (e) {}
    },
    async remove(ctx) {
        let attributes = ctx.attributes;
        try {
            const result = await orderModel.destroy({
                include: OrderProduct,
                where: {
                    id: attributes.orderId
                }
            })
        } catch (e) {
            console.log(e)
        }
    },
    async createPdf(ctx) {
        let attributes = ctx.attributes;
        console.log('=====', attributes);
        const filename = path.join(__dirname, '../../static/', getUniqueFilename() + '.pdf')

        const pdf = await (async() => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setCacheEnabled(false)

            await page.goto('http://localhost:3000');
            const loginInput = await page.$('.ant-input');
            console.log(loginInput);
            await page.focus('.ant-input');
            await page.waitFor(500);
            await page.type('.ant-input', 'zhoudi', {delay: 100})

            const pdf = await page.pdf({format: 'A4'});
            await browser.close();
            return pdf
        })();
        ctx.set({'Content-Type': 'application/pdf','Content-Length': pdf.length})
        ctx.body=pdf;

        function getUniqueFilename (){
            let name = 'file'+Math.floor(Math.random()*10000)
            return name
        }
    }
}