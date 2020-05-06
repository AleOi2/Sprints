module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
  
    return User;
  }