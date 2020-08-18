'use strict';

module.exports = (Sequelize, DataTypes) => {
    const order_product = Sequelize.define('Order_Product', {
        // id: {
        //     type: DataTypes.INTEGER,
        //     primaryKey: true,
        //     autoIncrement: true,
        //     allowNull: false
        // },
        productId: {
            type: DataTypes.INTEGER.UNSIGNED, 
            field: 'product_id', 
            primaryKey: true, 
            allowNull: false, 
            comment: '产品id'
        },
        orderId: {
            type: DataTypes.INTEGER.UNSIGNED, 
            field: 'order_id', 
            primaryKey: true, 
            allowNull: false, 
            comment: '订单id'
        },
        number: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            comment: '产品数量'
        },
        itemColor: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: true,
            comment: '颜色'
        }
    }, {
        tableName: 'orderProductMapping',
    })

    order_product.association= function(sequelize){
        this.belongsTo(sequelize.models.order);
        this.belongsTo(sequelize.models.product);
     }

    order_product.sync({
        force: false,
    })

    return order_product;
}