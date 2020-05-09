const {AppError} = require('ch-error');

const Mysql = global.Mysql;
const Op = Mysql.Op;
const houseModel = Mysql.models.house;
const redis = global.Redis;

module.exports = {
    //支持的token列表
    async list(ctx) {
        console.log(ctx);
        let attributes = ctx.attributes;
        // let options = {
        //     id: ctx.identity.id,
        //     status: {
        //         [Op.ne]: houseModel.STATUS_CLOSE
        //     }
        // };
        if (attributes.token) options.token = attributes.token;
        if (attributes.type) options.type = attributes.type;
        if (attributes.start_time || attributes.end_time) {
            options.add_time = {
                [Op.gte]: attributes.start_time || 0,
                [Op.lte]: attributes.end_time || moment().unix()
            };
        }
        ctx.body.data = await houseModel.findAndCountAll({
            attributes: ['id','status',],
            order: [['id', 'DESC']],
            // offset: (attributes.page - 1) * attributes.page_size,
            // limit: attributes.page_size,
            raw: true
        });
    },
    async create(ctx) {
        let attributes = ctx.attributes;
        console.log(redis);

        redis.set("foo","bar2");
// console.log(redis.get("foo"));
        const result = await houseModel.create({
                id: attributes.uid,
                status: attributes.status,
                type: attributes.type
            });

    }
};
