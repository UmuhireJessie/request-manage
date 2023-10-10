'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Request.init({
    requestId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    title: DataTypes.STRING,
    detail: DataTypes.STRING,
    requestCategory: DataTypes.STRING,
    studentId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    assigneeId: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};