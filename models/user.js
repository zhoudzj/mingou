'use strict';
/**
 * 用户信息表
 */

module.exports = (Sequelize, DataTypes) => {
    const model = Sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '用户UID'
        },
        type: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false,
            comment: '用户类型'
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: true,
            comment: '用户姓名'
        },
        mobile: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '用户手机号'
        },
        area: {
            type: DataTypes.STRING(15),
            allowNull: true,
            comment: '用户手机号区号' 
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: true,
            comment: '用户邮箱'
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '用户密码加密字符串'
        },
        salt: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '用户密码加盐字符串'
        },
        permission: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '管理员权限' //权限通过位运算控制, (1:矿池管理, 2:订单记录, 4:矿池份额, 8:Token, 16:赠送矿池, 32:用户表, 64:充提表, 128:利息表, 256:管理员表)
        },
        add_time: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            comment: '用户创建时间'
        }
    }, {
        tableName: 'user',
        initialAutoIncrement: 1000,
        indexes: [{
            name: 'mobile_area',
            method: 'BTREE',
            unique: true,
            fields: ['mobile', 'area']
        }, {
            name: 'email',
            method: 'BTREE',
            fields: ['email']
        }]
    });
    
    //普通用户
    model.TYPE_NORMAL = 1;
    //管理员
    model.TYPE_ADMIN = 2;

    model.association= function(sequelize){
         this.hasMany(sequelize.models.order,);
     }

    model.sync({
        force:true
    })

    return model;
};