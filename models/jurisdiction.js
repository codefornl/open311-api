/*!
 * Service model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var jurisdiction = sequelize.define("jurisdiction", {
      jurisdiction_id: DataTypes.STRING
    });
    return jurisdiction;
  };
}());
