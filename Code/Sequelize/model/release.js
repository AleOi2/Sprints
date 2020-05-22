module.exports = (Sequelize, DataType)=>{
    const Release = Sequelize.define('Release', {
        id:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          }, 
          date: {
            type: DataType.DATE,
            allowNull: false
          },
          description: {
            type: DataType.STRING,
            allowNull: false
          },
          value: {
           type: DataType.DECIMAL,
           allowNull: false
          },
          createdAt: {
            type: DataType.DATE,
            allowNull: false
          }, 
          updatedAt: {
            type: DataType.DATE,
            allowNull: false
          },
          users_id:{
            type: DataType.INTEGER,
            allowNull: false
          },
          category_id:{
            type: DataType.INTEGER,
            allowNull: false
          }
    },{
        tableName: 'release'
    })

    return Release
}