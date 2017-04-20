(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('accounts', [
        {
          first_name: 'Regular',
          last_name: 'User',
          email: 'user@open311.com',
          token: 'usertoken',
          role: 'user'
        },
        {
          first_name: 'Admin',
          last_name: 'User',
          email: 'admin@open311.com',
          token: 'admintoken',
          role: 'admin'
        }
      ], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('accounts', null, {});
    }
  };
}());
