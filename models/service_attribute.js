/*!
 * Service model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var service_attribute = sequelize.define("service_attribute", {
      variable: DataTypes.BOOLEAN,
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      datatype: DataTypes.ENUM('string', 'number', 'datetime', 'text', 'singlevaluelist', 'multivaluelist'),
      required: DataTypes.BOOLEAN,
      datatype_description: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: ''
      },
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
