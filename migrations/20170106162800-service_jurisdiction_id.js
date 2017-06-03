(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.addColumn({
        tableName: 'services'
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
        tableName: 'services'
      },  'parent_external_id');
    }
  };
}());
