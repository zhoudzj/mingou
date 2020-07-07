const { AppError } = require('ch-error');

const Mysql = global.Mysql;
const Op = Mysql.Op;
const productModel = Mysql.models.product;
const styleModel = Mysql.models.style;
const styleProductModal = Mysql.models.Style_Product;

const redis = global.Redis;

module.exports = {
    //支持的token列表
    async list(ctx) {
        console.log('-------',ctx.attributes);
        let attributes = ctx.attributes;

        const result = await styleModel.findAll({
            include: productModel,
            // attributes: ['id','type','name','img','typeId'],
            where: {
                id: attributes.id,
            },
            raw: true
        });
        ctx.body.data = result.filter(item=>item['products.default']===0).map(element=>{
            const obj = {}
            Object.keys(element).forEach(key => {
                const arr = key.split('.');                
                const property = arr[arr.length-1]

                if (arr.length ===2||property==='number') {
                    obj[property] = element[key]
                }
            })
            return obj
        });
    },
    async findByTypeId(ctx) {
       let attributes = ctx.request.body;
       if(!Array.isArray(attributes.typeIds)){
            throw new AppError(11010, '参数错误');
       }
       const result = await productModel.findAll({
           where: {
               typeId:attributes.typeIds
           }
       })
       ctx.body.data = result;
    },
    async defaultList(ctx) {
        let attributes = ctx.attributes;
        const result = await styleModel.findAll({
            include: productModel,
            // attributes: ['id','type','name','img','typeId'],
            where: {
                id: attributes.id,
            },
            raw: true
        });
        ctx.body.data = result.filter(item=>item['products.default']===1).map(element=>{
            const obj = {}
            Object.keys(element).forEach(key => {
                const arr = key.split('.');                
                const property = arr[arr.length-1]

                if (arr.length ===2||property==='number') {
                    obj[property] = element[key]
                }
            })
            return obj
        });
    }
};