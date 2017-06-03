(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.addColumn({
        tableName: 'services'
      },
      'type',
      {
        type: Sequelize.ENUM,
        allowNull: false,
        defaultValue: 'realtime',
        values: ['realtime', 'blackbox', 'batch']
      }
    );
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.removeColumn({
        tableName: 'services'
      },  'type');
    }
  };
}());
