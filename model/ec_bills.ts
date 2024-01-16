import { DataTypes,Sequelize } from "sequelize";
import EcBills from "../types/ec_bills"
import sequelize from "../src/config/sequelize";

EcBills.init(
{
id: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true,
  allowNull: false,
  unique: true,
},
invoice_number: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
},
total_amount: {
  type: DataTypes.STRING, // Adjust the data type based on your requirements
  allowNull: false,
},
products: {
  type: DataTypes.JSON, // Assuming products is a JSON object
  allowNull: false,
},
createdAt: {
  type: DataTypes.DATE,
  allowNull: false,
  defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
},
updatedAt: {
  type: DataTypes.DATE,
  allowNull: false,
  defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
},
},
{
sequelize,
modelName: 'ec_bills',
tableName: 'ec_bills',
}
);

export default EcBills;
