/*!
 * Service model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var jurisdiction = sequelize.define("jurisdiction", {
      id : {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
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
      timestamps: false,
      classMethods: {
        associate: function(models) {
          jurisdiction.belongsToMany(models.service, {
            through: 'jurisdiction_service',
            foreignKey: 'jurisdiction_id',
            otherKey: 'service_id',
            timestamps: false
          });
          jurisdiction.hasMany(models.department, {foreignKey: 'jurisdiction_id'});
        }
      }
    });
    return jurisdiction;
  };
}());
