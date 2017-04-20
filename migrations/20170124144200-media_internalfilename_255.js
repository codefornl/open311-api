(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.changeColumn(
        'media',
        'internalFilename',
        {
          type: Sequelize.STRING(255),
          allowNull: false,
        }
      );
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.changeColumn(
        'media',
        'internalFilename',
        {
          type: Sequelize.STRING(50),
          allowNull: false,
        }
      );
    }
  };
}());
