const {AppError} = require('ch-error');

const Mysql = global.Mysql;
const Op = Mysql.Op;
const styleHouseModel = Mysql.models.style;
const houseModel = Mysql.models.community;
const redis = global.Redis;
  
module.exports = {
    //支持的token列表
    async findType(ctx) {
        let attributes = ctx.attributes;
        if(!Array.isArray(attributes.roomData)||attributes.roomData.length===0){
            throw new AppError(11010, '参数错误');
       }
       const newArr = attributes.roomData.map(item=>{
            return Number(item)
       })
       console.log(newArr);
        const typeObj = await houseModel.findOne({
            attributes: ['type'],
            where:{
                building:newArr[0],
                unit:newArr[1],
                room:newArr[2]
            }
        });
        console.log(typeObj);
        ctx.body.data = await styleHouseModel.findAll({
            attributes: ['id','type','name','img','typeId'],
            where: {
                type: typeObj.type,
            }
        });
    },
};