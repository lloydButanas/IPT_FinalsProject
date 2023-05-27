const { DataTypes } = require("sequelize");

module.exports = model;

function initialize(sequelize) {
  // Initialize models and define relationships here
  const orderDetails = defineorderDetails(sequelize);

  // Define associations/relationships here
  orderDetails.belongsTo(db.Orders, { foreignKey: "orderNumber" });
  orderDetails.belongsTo(db.Product, { foreignKey: "productCode" });

  return {
    orderDetails: orderDetails,
  };
}

function model(sequelize) {
  const attributes = {
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    productCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    quantityOrdered: { type: DataTypes.STRING, allowNull: false },
    priceEach: { type: DataTypes.DECIMAL, allowNull: false },
    orderLineNumber: { type: DataTypes.INTEGER, allowNull: false },
  };

  const options = {
    timestamps: false,
    indexes: [
      {
        unique: false,
        fields: ["productCode"],
      },
    ],
  };

  const OrderDetails = sequelize.define("orderDetails", attributes, options);

  // Define foreign key relationship
  OrderDetails.associate = (models) => {
    OrderDetails.belongsTo(models.Orders, {
      foreignKey: "orderNumber",
      targetKey: "orderNumber",
    });
  };

  OrderDetails.associate = (models) => {
    OrderDetails.belongsTo(models.Products, {
      foreignKey: "productCode",
      targetKey: "productCode",
    });
  };

  return OrderDetails;
}
