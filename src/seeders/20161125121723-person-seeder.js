(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('people', [{
        firstname: 'Regular',
        lastname: 'User',
        role: 'user'
      },{
        firstname: 'Admin',
        lastname: 'User',
        role: 'admin'
      }], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('people', null, {});
    }
  };
}());
