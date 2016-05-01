/*!
 * User model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var device = sequelize.define("device", {
      device_id: DataTypes.INTEGER
    });
    return device;
  };
}());
