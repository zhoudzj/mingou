'use strict';

module.exports = (Sequelize, DataTypes) => {
    const order_product = Sequelize.define('Order_Product', {
        productId: {
            type: DataTypes.INTEGER.UNSIGNED, 
            field: 'product_id', 
            primaryKey: true, 
            allowNull: false, 
            comment: '产品id'
        },
        orderId:{
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
        }
    }, {
        tableName: 'orderProductMapping',
    })

    order_product.sync({
        force: true
    })

    return order_product;
}