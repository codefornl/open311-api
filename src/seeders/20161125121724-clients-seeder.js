(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('clients', [{
        name: 'testapp',
        url: 'http://testapp.com',
        api_key: '56b074c9495b1'
      }], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('clients', null, {});
    }
  };
}());
