'use strict';

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
            type: DataTypes.STRING(100),
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
    }, {
        tableName: 'products',
        // indexes: [{
        //     name: 'product_id_type',
        //     method: 'BTREE',
        //     fields: ['id', 'typeId'] 
        // }]
    });

     model.association= function(sequelize){
        console.log(sequelize)
         this.belongsToMany(sequelize.models.style,{through:sequelize.models.Style_Product,foreignKey:'product_id', otherKey:'style_id'})
     }

    model.sync({
        force:false
    })

    return model;
};