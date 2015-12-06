/*!
 * Service Value model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var service_attribute_value = sequelize.define("service_attribute_value", {
      key: DataTypes.STRING,
      name: DataTypes.STRING
    });
    return service_attribute_value;
  };
}());
