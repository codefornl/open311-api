(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.changeColumn(
        'media',
        'filename',
        {
          type: Sequelize.STRING(255),
          allowNull: false,
        }
      );
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.changeColumn(
        'media',
        'filename',
        {
          type: Sequelize.STRING(128),
          allowNull: false,
        }
      );
    }
  };
}());
