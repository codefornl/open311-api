(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('departments', {
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
        defaultPerson_id: {
          type: Sequelize.INTEGER
        }
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('departments');
    }
  };
}());
