module.exports = (Sequelize, DataType) => {
    const PredictCategory = Sequelize.define('PredictCategory', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        valuePredict: {
            type: DataType.DECIMAL(12, 2),
            allowNull: false
        },
        users_id: {
            type: DataType.INTEGER,
            allowNull: false
        },
        category_id: {
            type: DataType.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        }
    }, {
        tableName: 'predict_category'
    });

    PredictCategory.associate = (model) => {
        PredictCategory.belongsTo(model.Users, {
            foreignKey: 'users_id',
            sourceKey: 'id'
        });

        PredictCategory.belongsTo(model.Category, {
            foreignKey: 'category_id',
            sourceKey: 'id'
        })
    }

    return PredictCategory
}