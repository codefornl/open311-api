(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('service_mimetype', {
        service_id: {
          allowNull: false,
          type: Sequelize.INTEGER.UNSIGNED
        },
        mimetype: Sequelize.STRING(128)
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('service_mimetype');
    }
  };
}());
