(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.addColumn({
        tableName: 'jurisdictions'
      },
      'name',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.removeColumn({
        tableName: 'jurisdictions'
      },  'name');
    }
  };
}());
