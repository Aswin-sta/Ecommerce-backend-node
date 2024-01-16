import { Sequelize  } from "sequelize";

const sequelize = new Sequelize({
    host: "127.0.0.1",
    username: "root",
    database: "ecommerce_db",
    password: "SbtA4ever@1822",
    port: 3306,
    dialect: "mysql",
  });
  
const  sequelizeSync= async ()=>{
    await sequelize
        .sync({ force:false}) //set force to true to drop and recreate tables on every application start
        .then(() => {
          console.log("Database Synced");
        })
        .catch((error) => {
          console.error("Error syncing database:", error);
        });
    
      }

      export default sequelizeSync