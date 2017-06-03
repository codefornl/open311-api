(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.addColumn({
        tableName: 'services'
      },
      'accept_media',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    );
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.removeColumn({
        tableName: 'services'
      },  'accept_media');
    }
  };
}());
