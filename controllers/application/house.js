const { AppError } = require('ch-error');

const Mysql = global.Mysql;
const Op = Mysql.Op;
const houseModel = Mysql.models.community;

const redis = global.Redis;

module.exports = {
    //支持的token列表
    async list(ctx) {
        console.log('-------',ctx.attributes);
        let attributes = ctx.attributes;

        const result = await houseModel.findAll({
            attributes: ['id','building','unit','room'],
            where: {
                communityId: attributes.communityId,
            },
            raw: true
        });
        ctx.body.data = result
    }
};