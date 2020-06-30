const { DataTypes, Model } = require('sequelize');
const sequelize = require('../util/database');
class Order extends Model {}
Order.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
}, {
  sequelize,
  modelName: 'order'
});

module.exports = Order;