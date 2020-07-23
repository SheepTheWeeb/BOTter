module.exports = (sequelize, DataTypes) => {
  const redflag = sequelize.define('redflag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    received_from: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    double_red: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    underscored: true,
    freezeTableName: true,
  })

  redflag.associate = function(models) {
    redflag.belongsTo(models.user, { foreignKey: 'user_id', as: 'receiver' });
    redflag.belongsTo(models.user, { foreignKey: 'received_from', as: 'giver' });
  }

  return redflag;
};
