/*!
 * Service model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var jurisdiction_service = sequelize.define("jurisdiction_service", {
      jurisdiction_id : {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      service_id : {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      }
    }, {
      timestamps: false
    });
    return jurisdiction_service;
  };
}());
