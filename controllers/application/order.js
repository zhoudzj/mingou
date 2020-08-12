const {AppError,SystemError} = require('ch-error');
const puppeteer = require('puppeteer');

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
                create_time:new Date().getTime()
            });
            const newList = attributes.list.map(item=>{
                const obj = {};
                obj.productId= item.id;
                obj.orderId= result.id;
                obj.number= item.number;
                return obj
            }); 
            console.log(newList);

            ctx.body.data = await OrderProduct.bulkCreate(newList);
        } catch (e) {
            console.log(e);
            if(e.name==='SequelizeForeignKeyConstraintError'){
                throw new AppError(12000, '用户不存在');
            }
        }
    },
    async find(ctx) {
        let attributes = ctx.attributes;
        const useInfo = ctx.request.identity;
        try {
        ctx.body.data = await orderModel.findAll({
            where: {
                user_id: useInfo.id,
            },
                raw: true
            });
        } catch (e) {

        }
    },
    async detail(ctx) {
        let attributes = ctx.attributes;
        try {
         const result = await OrderProduct.findAll({
            include: productModel,
            where: {
                orderId: attributes.orderId,
            },
                raw: true
            });
        
        ctx.body.data = result.map(item=>{
            const obj = {};
            Object.keys(item).forEach(key => {
                console.log(key);
                const arr = key.split('.');                
                const property = arr[arr.length-1]
                console.log(property);
                if (['id','number','typeId','type','groupId','childId','name','brand','model','price','unit','default','color'].includes(property)) {
                    obj[property] = item[key]
                }
            })
            return obj;
        });
        } catch (e) {

        }
    },
    async remove(ctx) {
        let attributes = ctx.attributes;
        try {
            const result = await orderModel.destroy({
                include: OrderProduct,
                where: {
                id: attributes.orderId,
                },
            })
        } catch (e) {
            console.log(e)
        }
    },
    async createPdf(ctx) {
        let attributes = ctx.attributes;
        console.log('=====',attributes);
        (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(attributes.url,{waitUntil: 'networkidle2'});
            await page.pdf({path:'hh.pdf',format:'A4'});
            await browser.close();
        })();
    }
};