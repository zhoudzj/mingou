'use strict';

module.exports = (Sequelize, DataTypes) => {
    const model = Sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '产品编号'
        },
        typeId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '产品类型Id'
        },
        type: {  
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '产品类型'
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '产品名称'
        },
        description: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '产品描述'
        },
        price: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '产品价格'
        }, 
        img: {
            type: DataTypes.STRING(100), 
            allowNull: true,
            comment: '产品图片'
        }
    }, {
        tableName: 'type_house',
        // indexes: [{
        //     name: 'house_id_type',
        //     method: 'BTREE',
        //     fields: ['id', 'type'] 
        // }]
    });
    
    model.sync({
        force:false
    })

    return model;
};