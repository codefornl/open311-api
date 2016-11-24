(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('actions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.STRING
        },
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
