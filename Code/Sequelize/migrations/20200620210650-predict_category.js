'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 
      return queryInterface.createTable('predict_category', {
         id:{
           type: Sequelize.INTEGER,
           primaryKey: true,
           autoIncrement: true,
           allowNull: false
         }, 
         valuePredict: {
          type: Sequelize.DECIMAL(12,2),
          allowNull: false,
          defaultValue: 0
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
              tableName: 'Users',
              key: 'id'
            },
          },
          onDelete: 'CASCADE',
        },
        category_id: {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'category',
              key: 'id'
            }
          },
          onDelete: 'CASCADE',
        }
  
        });

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('predict_category');

  }
};
