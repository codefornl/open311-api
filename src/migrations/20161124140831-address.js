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
        street: Sequelize.STRING(80),
        housenumber: Sequelize.STRING(80),
        postcode: Sequelize.STRING(80),
        place: Sequelize.STRING(80),
        city: Sequelize.STRING(80),
        province: Sequelize.STRING(80),
        latitude: Sequelize.FLOAT(17,14),
        longitude: Sequelize.FLOAT(17,14),
        source: Sequelize.STRING(80),
        source_object: Sequelize.STRING(80),
        source_id: Sequelize.STRING(80)
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('address');
    }
  };
}());
