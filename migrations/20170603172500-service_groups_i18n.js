(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('service_group_i18ns', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED
        },
        language_id: Sequelize.STRING,
        parent_id: Sequelize.STRING,
        group_name: Sequelize.STRING
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('service_group_i18ns');
    }
  };
}());
