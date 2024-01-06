import { Sequelize  } from "sequelize";

const sequelize = new Sequelize({
    host: "127.0.0.1",
    username: "root",
    database: "ecommerce_db",
    password: "SbtA4ever@1822",
    port: 3306,
    dialect: "mysql",
  });
  
 export default sequelize;
