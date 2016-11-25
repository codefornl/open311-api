(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('actions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED
        },
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        type: {
          type: Sequelize.ENUM,
          values: ['system', 'department']
        }
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('actions');
    }
  };
}());
