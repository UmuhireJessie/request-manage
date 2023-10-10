'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'respondentId', as: 'respondants' })
    }
  }
  Feedback.init({
    feedbackId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    detail: DataTypes.STRING,
    respondentId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    requestId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Feedback',
  });
  return Feedback;
};