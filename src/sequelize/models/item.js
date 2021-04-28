module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Item.associate = function (models) {
    // associations can be defined here
    Item.belongsTo(models.User, {
      constraints: true,
      onDelete: 'CASCADE',
    });
  };
  return Item;
};
