(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('departments', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED
        },
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        defaultPerson_id: Sequelize.INTEGER
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('departments');
    }
  };
}());
