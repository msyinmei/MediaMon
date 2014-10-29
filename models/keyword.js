"use strict";

module.exports = function(sequelize, DataTypes) {
  var Keyword = sequelize.define("Keyword", {
    name: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(db) {
        // associations can be defined here
        Keyword.hasMany(db.KeywordsUser);
      }
    }
  });

  return Keyword;
};
