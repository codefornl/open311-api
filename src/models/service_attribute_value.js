/*!
 * Service Value model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var service_attribute_value = sequelize.define("service_attribute_value", {
      key: DataTypes.STRING,
      name: DataTypes.STRING
    }, {
      classMethods: {
        associate: function(models) {
          service_attribute_value.belongsTo(models.service_attribute);
        }
      }
    });
    return service_attribute_value;
  };
}());
