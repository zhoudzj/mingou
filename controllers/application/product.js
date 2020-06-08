const {AppError} = require('ch-error');

const Mysql = global.Mysql;
const Op = Mysql.Op;
const productModel = Mysql.models.product;
const redis = global.Redis;
  
module.exports = {
    //支持的token列表
    async list(ctx) {
        console.log(ctx.attributes);
        let attributes = ctx.attributes;
        
        ctx.body.data = await productModel.findAll({
            attributes: ['id','type','name','img','typeId'],
            where: {
                typeId: attributes.id,
            }
        });
    },
};