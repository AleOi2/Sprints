'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('Users', [
      {
        name: 'Alexandre',
        surname: 'Oide',
        email: 'alexandre@gmail.com',
        password: 'ale123',
        createdAt: new Date(),

      },
      {
        name: 'Marlon',
        surname: 'da Silva',
        email: 'marlon@gmail.com',
        password: 'marlon123',
        createdAt: new Date(),

      },
      {
        name: 'Fabricio',
        surname: 'Lima',
        email: 'fabricio@gmail.com',
        password: 'fabricio123',
        createdAt: new Date(),

      }

    ], {});



  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Users', null, {});
  }
};
