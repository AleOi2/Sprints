module.exports = (Sequelize, DataType) => {
  const Release = Sequelize.define('Release', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    date: {
      type: DataType.DATE,
      allowNull: false
    },
    value:{
      type: DataType.INTEGER,
      allowNull: false
    },
    description: {
      type: DataType.STRING,
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
    users_id: {
      type: DataType.INTEGER,
      allowNull: false
    },
    category_id: {
      type: DataType.INTEGER,
      allowNull: false
    },
    month_year: {
      type: DataType.STRING,
      allowNull: false
    }

  }, {
    tableName: 'release'
  });

  Release.associate = (model) =>{
    Release.belongsTo(model.Users, {
      foreignKey: 'users_id',
      targetKey: 'id'
    }),
    Release.belongsTo(model.Category, {
      foreignKey: 'category_id',
      targetKey: 'id'
    })

    
  }

  return Release
}