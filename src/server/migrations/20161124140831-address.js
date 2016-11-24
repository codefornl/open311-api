(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('address', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED
        },
        street: Sequelize.STRING,
        housenumber: Sequelize.STRING,
        postcode: Sequelize.STRING,
        place: Sequelize.STRING,
        city: Sequelize.STRING,
        province: Sequelize.STRING,
        latitude: Sequelize.FLOAT,
        longitude: Sequelize.FLOAT,
        source: Sequelize.STRING,
        source_object: Sequelize.STRING,
        source_id: Sequelize.STRING
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('address');
    }
  };
}());
