const {AppError} = require('ch-error');

const Mysql = global.Mysql;
const Op = Mysql.Op;
const styleOrderModel = Mysql.models.order;
const redis = global.Redis;
  
module.exports = {
    //支持的token列表
    async findByTypeId(ctx) {
        let attributes = ctx.attributes;
        
        ctx.body.data = await styleOrderModel.create({
                        
        });
    },
};