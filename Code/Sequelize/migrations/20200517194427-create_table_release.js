'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 
      return queryInterface.createTable('release', {
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
         description: {
           type: Sequelize.STRING(50),
           allowNull: false
         },
         value: {
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
         },

         users_id: {
           type: Sequelize.INTEGER,
           references: {
             model: {
               tableName: 'Users'
             },
             key: 'id'
           }
         },

         category_id: {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'category'
            },
            key: 'id'
          }
        }

        });

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('release');

  }
};