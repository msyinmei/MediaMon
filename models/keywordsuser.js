"use strict";

module.exports = function(sequelize, DataTypes) {
  var KeywordsUser = sequelize.define("KeywordsUser", {
    KeywordId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        KeywordsUser.belongsTo(models.Keyword);
        KeywordsUser.belongsTo(models.User);
      }
    }
  });

  return KeywordsUser;
};
