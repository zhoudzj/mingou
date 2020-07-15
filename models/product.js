'use strict';
/**
 * 产品表
 */

module.exports = (Sequelize, DataTypes) => {
    const model = Sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            comment: '产品编号'
        },
        typeId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            comment: '产品类型Id'
        },
        type: {  
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '产品类型'
        },
        groupId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            comment: '组ID'
        },
        childId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            comment: '子ID'
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '产品名称'
        },
        brand: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '品牌'
        },
        model: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '型号/规格'
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: true,
            comment: '产品描述'
        },
        price: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '产品价格'
        },
        unit: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '单位'
        },
        img: {
            type: DataTypes.STRING(100), 
            allowNull: true,
            comment: '产品图片'
        },
        default: {
            type: DataTypes.BOOLEAN, 
            allowNull: true,
            comment: '是否默认配置'
        },
        color: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: true,
            comment: '颜色'
        }
    }, {
        tableName: 'products',
        // indexes: [{
        //     name: 'product_id_type',
        //     method: 'BTREE',
        //     fields: ['id', 'typeId'] 
        // }]
    });

     model.association= function(sequelize){
         this.belongsToMany(sequelize.models.style,{through:sequelize.models.Style_Product,foreignKey:'product_id', otherKey:'style_id'});
         this.belongsToMany(sequelize.models.order,{through:sequelize.models.Order_Product,foreignKey:'product_id', otherKey:'order_id'})
     }

    //灰/雪花银
    model.COLOR_GRAY = 1;
    //金/香槟金
    model.COLOR_GOLDEN = 2;
    //黑/云母黑
    model.COLOR_BLACK = 3;
    
    model.sync({
        force:false
    })

    return model;
};