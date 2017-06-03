(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('service_groups', [{
        id: 1,
        ordering: 2
      },
      {
        id: 2,
        ordering: 3
      },
      {
        id: 3,
        ordering: 1
      }], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('service_groups', null, {});
    }
  };
}());
