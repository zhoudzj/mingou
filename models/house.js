'use strict';
/**
 * 社区表
 */

module.exports = (Sequelize, DataTypes) => {
    const model = Sequelize.define('community', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '序号'
        },
        communityId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            comment: '小区编号'
        },
        communityName: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '小区名字'
        },
        houseNo: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '住宅地址'
        },
        building: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            comment: '幢'
        },
        unit: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            comment: '单元'
        },
        room: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            comment: '房号'
        },
        area: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
            comment: '面积(m2)'
        },
        type: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '户型'
        }
    }, {
        tableName: 'community',
    });

    model.sync({force: false})

    return model;
};