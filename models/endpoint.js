/*!
 * User model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var endpoint = sequelize.define("endpoint", {
      specification: DataTypes.TEXT, //http://wiki.open311.org/geoReport_v2
      url: DataTypes.STRING,
      changeset: {
        type: DataTypes.DATE,
        defaultValue: new Date()
      },
      type: DataTypes.ENUM('production', 'test')
    }, {
      paranoid: true,
      classMethods: {
        associate: function(models) {
          endpoint.belongsTo(models.discovery);
        }
      }
    });
    return endpoint;
  };
}());
