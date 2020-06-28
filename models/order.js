'use strict';

module.exports = (Sequelize, DataTypes) => {
    const model = Sequelize.define('order', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            comment: '订单编号'
        },
        style_name: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '户型名称'
        },
        create_time: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            comment: '订单创建时间'
        }
    }, {
        tableName: 'orders',
        // indexes: [{
        //     name: 'product_id_type',
        //     method: 'BTREE',
        //     fields: ['id', 'typeId'] 
        // }]
    });

     model.association= function(sequelize){
         this.belongsToMany(sequelize.models.product,{through:sequelize.models.Order_Product});
     }

    model.sync({
        force:true
    })

    return model;
};