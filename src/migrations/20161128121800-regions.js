(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('regions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED
        },
        name: Sequelize.STRING(80),
        level: Sequelize.INTEGER,
        shape: {
          type: Sequelize.GEOMETRY({type: 'POLYGON'}),
          allowNull: false
        }
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('regions');
    }
  };
}());
