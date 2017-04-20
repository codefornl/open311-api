(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.addColumn({
        tableName: 'categories'
      },
      'jurisdiction_id',
      {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
      }
    );
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.removeColumn({
        tableName: 'categories'
      },  'parent_external_id');
    }
  };
}());
