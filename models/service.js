/*!
 * Service model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var Service = sequelize.define("Service", {
      service_code: DataTypes.STRING,
      service_name: DataTypes.STRING,
      description: DataTypes.TEXT,
      metadata: DataTypes.BOOLEAN,
      type: DataTypes.STRING,
      keywords: DataTypes.TEXT,
      group: DataTypes.STRING
    });
    return Service;
  };
}());
