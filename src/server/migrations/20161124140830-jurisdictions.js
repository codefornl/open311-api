(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('jurisdictions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED
        },
        jurisdiction_id: Sequelize.STRING,
        is_default: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('jurisdictions');
    }
  };
}());
