(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('jurisdictions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        jurisdiction_id: {
          type: Sequelize.STRING
        },
        is_default: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('jurisdictions');
    }
  };
}());
