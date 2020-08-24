'use strict';
const moment = require('moment');
module.exports = (Sequelize, DataTypes) => {
    const model = Sequelize.define('order', {
        // id: {
        //     type: DataTypes.INTEGER.UNSIGNED,
        //     primaryKey: true,
        //     autoIncrement: true,
        //     comment: '订单编号'
        // },
        project_name: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '项目名称'
        },
        style_name: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '户型名称'
        },
        house_num: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '房号'
        },
        master_name: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '姓名'
        },
        sales_name: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '销售名字'
        },
        create_time: {
            type: DataTypes.DATE,
            allowNull: false,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            comment: '订单创建时间'
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            comment: '用户Id'
        }
    }, {
        tableName: 'order',
        initialAutoIncrement: 1000,
        // indexes: [{
        //     name: 'product_id_type',
        //     method: 'BTREE',
        //     fields: ['id', 'typeId'] 
        // }]
    });

     model.association= function(sequelize){
        this.belongsTo(sequelize.models.user,{
            foreignKey:'user_id',
            targetKey:'id',
        });
        this.belongsToMany(sequelize.models.product,{through:sequelize.models.Order_Product});
        this.hasMany(sequelize.models.Order_Product);
     }

    model.sync({
        force:false,
    })

    return model;
};