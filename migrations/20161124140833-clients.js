(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('clients', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        url: Sequelize.STRING,
        api_key: {
          type: Sequelize.STRING,
          allowNull: false
        },
        contactPerson_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 1
        },
        contactMethod_id: Sequelize.INTEGER.UNSIGNED
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('clients');
    }
  };
}());
