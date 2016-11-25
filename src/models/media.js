/*!
 * media model,
 * This one is mainly here because of uReport legacy
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var media = sequelize.define("media", {
      filename: DataTypes.STRING,
      internalFilename: DataTypes.STRING,
      mime_type: DataTypes.STRING,
      media_type: DataTypes.STRING
    }, {
      tableName: 'media',
      timestamps: true,
      createdAt: false,
      updatedAt: 'uploaded',
      classMethods: {
        associate: function(models) {
          media.belongsTo(models.issue,{foreignKey: 'issue_id'});
        }
      }
    });
    return media;
  };
}());
