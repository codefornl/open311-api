/*!
 * Service model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var location = sequelize.define("location", {
      lat: DataTypes.DOUBLE,
      long: DataTypes.DOUBLE,
      address_string: DataTypes.STRING, //string, number, datetime,text,singlevaluelist, multivaluelist
      address_id: DataTypes.STRING,
      zipcode: DataTypes.STRING
    });
    return location;
  };
}());
