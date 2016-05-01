/*!
 * User model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var discovery = sequelize.define("discovery", {
      key_service: DataTypes.TEXT,
      contact: DataTypes.TEXT,
      changeset: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    }, {
      paranoid: true,
      classMethods: {
        associate: function(models) {
          discovery.hasMany(models.endpoint);
        }
      }
    });
    return discovery;
  };
}());
