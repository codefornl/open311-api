/*!
 * Service model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var jurisdiction = sequelize.define("jurisdiction", {
      jurisdiction_id: DataTypes.STRING,
      is_default: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, {
      classMethods: {
        associate: function(models) {
          //jurisdiction.hasMany(models.service);
        }
      }
    });
    return jurisdiction;
  };
}());
