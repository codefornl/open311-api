(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('applications', {
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
        person_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 1
        }
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('applications');
    }
  };
}());
