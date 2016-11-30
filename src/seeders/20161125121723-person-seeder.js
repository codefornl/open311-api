(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('people', [{
        id: 1,
        firstname: 'Regular',
        lastname: 'User',
        role: 'user'
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
      }], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('people', null, {});
    }
  };
}());
