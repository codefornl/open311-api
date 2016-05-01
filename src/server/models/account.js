/*!
 * User model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var account = sequelize.define("account", {
      account_id: DataTypes.INTEGER,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      token: DataTypes.STRING,
      role: DataTypes.STRING
    });
    return account;
  };
}());
