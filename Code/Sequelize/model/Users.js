module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      createdAt:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()'),
      }
    },{
      timestamps: false
    });

    Users.associate = (model) =>{
      Users.hasMany(model.Release, {
        foreignKey: 'users_id',
        sourceKey: 'id'
      })
      
    }

    return Users;
  }