(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('people', [{
        id: 1,
        firstname: 'Regular',
        lastname: 'User',
        username: 'eindhoven_behandelaar',
        role: 'user',
        department_id: 23
      },{
        id: 2,
        firstname: 'Admin',
        lastname: 'User',
        role: 'admin'
      },
      {
        id: 3,
        firstname: 'John',
        lastname: 'Doe',
        role: 'user'
      },
      {
        id: 4,
        firstname: 'John',
        lastname: 'Doe',
        role: 'user',
        username: 'testcorp1_behandelaar',
        department_id: 28
      }], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('people', null, {});
    }
  };
}());
