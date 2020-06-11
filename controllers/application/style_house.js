const {AppError} = require('ch-error');

const Mysql = global.Mysql;
const Op = Mysql.Op;
const styleHouseModel = Mysql.models.style;
const redis = global.Redis;
  
module.exports = {
    //支持的token列表
    async findByTypeId(ctx) {
        let attributes = ctx.attributes;
        
        ctx.body.data = await styleHouseModel.findAll({
            attributes: ['id','type','name','img','typeId'],
            where: {
                typeId: attributes.typeId,
            }
        });
    },
};