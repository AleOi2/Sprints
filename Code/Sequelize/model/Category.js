module.exports = (Sequelize, DataType)=>{
    const Category = Sequelize.define('Category', {
        id:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          }, 
          category: {
            type: DataType.STRING,
            allowNull: false
          },
          type: {
            type: DataType.STRING,
            allowNull: false
          }, 
          valuePredict: {
           type: DataType.DECIMAL(12,2),
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
    },{
        tableName: 'category'
    });

    Category.associate = (model) =>{
      Category.hasMany(model.Release, {
        foreignKey: 'category_id',
        sourceKey: 'id'
      })  
    }

    return Category
}