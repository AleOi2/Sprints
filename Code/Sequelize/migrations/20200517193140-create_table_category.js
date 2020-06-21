'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 
      return queryInterface.createTable('category', {
         id:{
           type: Sequelize.INTEGER,
           primaryKey: true,
           autoIncrement: true,
           allowNull: false
         }, 
         category: {
           type: Sequelize.STRING,
           allowNull: false
         },
         label:{
          type: Sequelize.STRING,
          allowNull: false
         },
         type: {
           type: Sequelize.STRING,
           allowNull: false
         }, 
         valuePredict: {
          type: Sequelize.DECIMAL(12,2),
          allowNull: false
         },
         createdAt: {
           type: Sequelize.DATE,
           allowNull: false
         }, 
         updatedAt: {
           type: Sequelize.DATE,
           allowNull: false
         }

        });

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('category');

  }
};
