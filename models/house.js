'use strict';

module.exports = (Sequelize, DataTypes) => {
    const model = Sequelize.define('house', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '社区编号'
        },
        status: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false,
            comment: '流水状态'
        },
        type: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false,
            comment: '社区类型'
        }
    }, {
        tableName: 'house',
        indexes: [{
            name: 'house_id_type',
            method: 'BTREE',
            fields: ['id', 'type'] 
        }]
    });
    
    //成功
    model.STATUS_SUCCEED = 1;
    //失败
    model.STATUS_FAILED = 2;

    return model;
};