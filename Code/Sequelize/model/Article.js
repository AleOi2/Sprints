module.exports = (Sequelize, DataType)=>{
  const Article = Sequelize.define('Article', {
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
        imageHighlight: {
          type: DataType.STRING,
           allowNull: false
         },
        imageArticle: {
         type: DataType.STRING,
          allowNull: false
        },
        titleArticle: {
          type: DataType.TEXT,
          allowNull: false
        },
        textArticle: {
          type: DataType.TEXT,
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
      tableName: 'article',
  })

  return Article
}