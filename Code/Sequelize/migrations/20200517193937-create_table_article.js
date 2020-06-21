'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 
      return queryInterface.createTable('article', {
         id:{
           type: Sequelize.INTEGER,
           primaryKey: true,
           autoIncrement: true,
           allowNull: false
         }, 
         date: {
           type: Sequelize.DATE,
           allowNull: false
         },
         imageArticle: {
          type: Sequelize.STRING,
           allowNull: false
         },
         titleArticle: {
          type: Sequelize.TEXT,
          allowNull: false
        },         
         textArticle: {
           type: Sequelize.TEXT,
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

      return queryInterface.dropTable('article');

  }
};
