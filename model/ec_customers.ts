import { DataTypes,Sequelize } from "sequelize";
import EcCustomers from "../types/ec_customers"
import sequelize from "../src/config/sequelize";


EcCustomers.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    full_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    e_mail:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    profile_pic:{
        type:DataTypes.BLOB,
        allowNull:true
    },
    registration_id:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        defaultValue:():string=>{
        return Math.floor(100000+Math.random()*900000).toString();
        }
    },
    registration_time_stamp:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
    
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP') //sequelize literal is used to use data types not availabe in sequelize but in sql
    },
    deletedAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
    }
   
},{
    sequelize,
    modelName:'ec_customers',
    tableName:'ec_customers',
    // hooks: {
    //     beforeCreate: (user:EcCustomers) => { 
    //       // Hash the password using bcrypt before creating the record
    //       const hashedPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    //       user.password = hashedPassword;
    //     },
    //   },
})


export default EcCustomers
