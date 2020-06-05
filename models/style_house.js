'use strict';

module.exports = (Sequelize, DataTypes) => {
    const model = Sequelize.define('type_house', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '户型编号'
        },
        type: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '户型分类'
        },
        typeId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            comment: '户型分类编号'
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '户型名称'
        },
        img: {
            type: DataTypes.STRING(100), 
            allowNull: true,
            comment: '户型图片'
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