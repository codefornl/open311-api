/*!
 * Service model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var service_attribute = sequelize.define("service_attribute", {
      variable: DataTypes.BOOLEAN,
      code: DataTypes.STRING,
      datatype: DataTypes.STRING, //string, number, datetime,text,singlevaluelist, multivaluelist
      required: DataTypes.BOOLEAN,
      datatype_description: DataTypes.TEXT,
      order: DataTypes.INTEGER,
      description: DataTypes.TEXT
    }, {
      classMethods: {
        associate: function(models) {
          service_attribute.belongsTo(models.service);
          service_attribute.hasMany(models.service_attribute_value);
        }
      }
    });
    return service_attribute;
  };
}());
