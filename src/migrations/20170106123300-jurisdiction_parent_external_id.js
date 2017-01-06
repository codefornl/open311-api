(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.addColumn({
        tableName: 'jurisdictions'
      },
      'parent_external_id',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.removeColumn({
        tableName: 'jurisdictions'
      },  'parent_external_id');
    }
  };
}());
