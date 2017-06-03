(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('service_i18ns', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED
        },
        language_id: Sequelize.STRING,
        parent_id: Sequelize.STRING,
        service_name: Sequelize.STRING,
        description: Sequelize.TEXT,
        keywords: Sequelize.TEXT
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('service_i18ns');
    }
  };
}());
