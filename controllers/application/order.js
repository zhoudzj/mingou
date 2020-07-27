const {AppError,SystemError} = require('ch-error');

const Mysql = global.Mysql;
const Op = Mysql.Op;
const orderModel = Mysql.models.order;
const redis = global.Redis;

module.exports = {
    //支持的token列表
    async create(ctx) {
        let attributes = ctx.attributes;
        console.log(attributes);
        const useInfo = ctx.request.identity;
        try {
            ctx.body.data = await orderModel.create({
                project_name: '大岳湾',
                style_name: '户型',
                house_num: 15937564756,
                master_name: '大佬',
                user_id: useInfo.uid,
                create_time:new Date().getTime()
            });
        } catch (e) {
            console.log(e);
            if(e.name==='SequelizeForeignKeyConstraintError'){
                throw new AppError(12000, '用户不存在');
            }
        }
    }
};