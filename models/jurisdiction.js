/*!
 * Service model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var jurisdiction = sequelize.define("jurisdiction", {
      jurisdiction_id: DataTypes.STRING,
      name: DataTypes.STRING,
      external_id: DataTypes.STRING,
      parent_name: DataTypes.STRING,
      parent_external_id: DataTypes.STRING,
      is_default: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, {
      classMethods: {
        associate: function(models) {
          jurisdiction.hasMany(models.service, {foreignKey: 'jurisdiction_id'});
        }
      }
    });
    return jurisdiction;
  };
}());
