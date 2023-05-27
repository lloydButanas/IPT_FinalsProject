const { DataTypes } = require("sequelize");

module.exports = model;

function initialize(sequelize) {
  // Initialize models and define relationships here
  const Orders = defineOrders(sequelize);

  // Define associations/relationships here
  Orders.belongsTo(db.Customer, { foreignKey: "customerNumber" });

  return {
    orders: Orders,
  };
}

function model(sequelize) {
  const attributes = {
    orderNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    orderDate: { type: DataTypes.DATE, allowNull: false },
    requiredDate: { type: DataTypes.DATE, allowNull: false },
    shippedDate: { type: DataTypes.DATE, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: false },
    comments: { type: DataTypes.STRING, allowNull: true },
    customerNumber: { type: DataTypes.INTEGER, allowNull: false },
  };

  const options = {
    timestamps: false,
  };

  const Orders = sequelize.define("Orders", attributes, options);

  // Define foreign key relationship
  Orders.associate = (models) => {
    Orders.belongsTo(models.Customer, {
      foreignKey: "customerNumber",
      targetKey: "customerNumber",
    });
  };

  return Orders;
}
