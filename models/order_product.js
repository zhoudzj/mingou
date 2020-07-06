'use strict';

module.exports = (Sequelize, DataTypes) => {
    const order_product = Sequelize.define('Order_Product', {
        number: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            comment: '产品数量'
        }
    }, {
        tableName: 'orderProductMapping',
    })

    order_product.sync({
        force: false
    })

    return order_product;
}