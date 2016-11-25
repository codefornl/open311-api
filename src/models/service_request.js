/*!
 * User model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var service_request = sequelize.define("service_request", {
      //lat: DataTypes.DOUBLE,
      //long: DataTypes.DOUBLE,
      //address_string: DataTypes.STRING,
      //address_id: DataTypes.STRING,
      email: DataTypes.STRING,
      device_id: DataTypes.STRING,
      account_id: DataTypes.INTEGER,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      phone: DataTypes.STRING,
      description: DataTypes.STRING,
      media_url: DataTypes.STRING,
      status: DataTypes.STRING //open,closed
    }, {
      classMethods: {
        associate: function(models) {
          service_request.hasOne(models.location);
          service_request.hasOne(models.account);
        }
      }
    });
    return service_request;
  };
}());
