(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('media', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED
        },
        issue_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false
        },
        filename: {
          type: Sequelize.STRING(128),
          allowNull: false
        },
        internalFilename: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        mime_type: Sequelize.STRING(128),
        media_type: Sequelize.STRING(50),
        uploaded: {
          type: Sequelize.DATE,
          allowNull: false
        },
        person_id: Sequelize.INTEGER.UNSIGNED
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('media');
    }
  };
}());
