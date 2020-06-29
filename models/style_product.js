'use strict';

module.exports = (Sequelize, DataTypes) => {
    const style_product = Sequelize.define('Style_Product', {
        productId: {
            type: DataTypes.INTEGER.UNSIGNED, 
            field: 'product_id', 
            primaryKey: true, 
            allowNull: false, 
            comment: '产品id'
        },
        styleId:{
            type: DataTypes.INTEGER.UNSIGNED, 
            field: 'style_id', 
            primaryKey: true, 
            allowNull: false, 
            comment: '户型id'
        },
        // id: {
        //     type: DataTypes.INTEGER.UNSIGNED,
        //     primaryKey: true,
        //     autoIncrement: true,
        //     allowNull: false
        // },
        number: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            comment: '产品数量'
        }
    }, {
        tableName: 'styleProductMapping',
    })

    style_product.sync({
        force: false
    })

    return style_product;
}

