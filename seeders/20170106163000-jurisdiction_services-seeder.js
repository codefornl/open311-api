(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('jurisdiction_services', [
        {
          jurisdiction_id: 772,
          service_id: 1
        }, {
          jurisdiction_id: 772,
          service_id: 2
        }, {
          jurisdiction_id: 9999,
          service_id: 1
        }, {
          jurisdiction_id: 9999,
          service_id: 2
        }, {
          jurisdiction_id: 9999,
          service_id: 3
        }
      ], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('jurisdiction_services', null, {});
    }
  };
}());
