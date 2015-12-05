/*!
 * User model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING
    });
    return User;
  };
}());
