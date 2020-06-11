const { AppError } = require('ch-error');

const Mysql = global.Mysql;
const Op = Mysql.Op;
const productModel = Mysql.models.product;
const styleModel = Mysql.models.style;

const redis = global.Redis;

module.exports = {
    //支持的token列表
    async list(ctx) {
        console.log(ctx.attributes);
        let attributes = ctx.attributes;

        const result = await styleModel.findAll({
            include: productModel,
            // attributes: ['id','type','name','img','typeId'],
            where: {
                id: attributes.id,
            },
            raw: true
        });
        console.log(result);
        const arr = result.map(element => {
            const obj = {}
            Object.keys(element).forEach(key => {
                const arr = key.split('.');
                console.log(arr);
                if (arr.length ===2||arr[arr.length-1]==='number') {
                    obj[arr[arr.length - 1]] = element[key]
                }
            })
            return obj
        });
        ctx.body.data = arr;
    }
};