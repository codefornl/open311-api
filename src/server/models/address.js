/*!
 * Address model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var address = sequelize.define("address", {
      street: DataTypes.STRING,
      housenumber: DataTypes.STRING,
      postcode: DataTypes.STRING,
      place: DataTypes.STRING,
      city: DataTypes.STRING,
      province: DataTypes.STRING,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      source: DataTypes.STRING,
      source_object: DataTypes.STRING,
      source_id: DataTypes.STRING
    },{
      tableName: 'address',
      timestamps: false,
      getterMethods: {
        address_string: function()  {
          /* do your magic here and return something! */
          return this.getDataValue('street') + ' ' + this.getDataValue('housenumber');
        }
      },
      setterMethods: {
        address_string: function(v) {
          /* do your magic with the input here! */
        }
      },
    });

    return address;
  };
}());
