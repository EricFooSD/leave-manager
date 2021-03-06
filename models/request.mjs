export default function requestModel(sequelize, DataTypes) {
  return sequelize.define('request', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    approverId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    dates: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    leaveType: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    comments: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, { underscored: true });
}
