import Router,{Request,Response} from 'express'
import express from 'express'
import EcSuppliers from '../../../model/ec_suppliers.ts';
import EcSuppliersModel from '../../../types/ec_suppliers.ts';
import EcCustomers from '../../../model/ec_customers.ts';
import EcCustomersModel from '../../../types/ec_customers.ts';
import jwt from 'jsonwebtoken'

let loginData :{
    e_mail: string,
    password: string,
    client_type: string, 
  };
const login=async (req:Request,res:Response):Promise<void> =>{
    loginData=req.body

    if(loginData.client_type==="supplier"){
              const result:EcSuppliersModel|null = await EcSuppliers.findOne({where: { e_mail: loginData.e_mail} })
              if (result?.password===loginData.password){
                  const token = jwt.sign(
                      { userId: result.registration_id, client_type:loginData.client_type },
                      'your-secret-key', // Replace with your secret key
                      { expiresIn: '24h' } // Token expiration time
                    );
                  res.status(200).json({"status":"login succesful","token":token,"expiry":"24h"});
              }else{
                  res.status(401).json("Inavlid client credentials")
              }
    }else if(loginData.client_type==="customer"){
              const result:EcCustomersModel|null = await EcCustomers.findOne({where: { e_mail: loginData.e_mail} })
              if (result?.password===loginData.password){
                  const token = jwt.sign(
                      { userId: result.registration_id, client_type:loginData.client_type },
                      'your-secret-key', // Replace with your secret key
                      { expiresIn: '24h' } // Token expiration time
                    );
                  res.status(200).json({"status":"login succesful","token":token,"expiry":"24h"});
              }else{
                  res.status(401).json("Inavlid client credentials")
              }
    }else{
              res.status(422).json("Unprocessable entity")
    }
  
}

export default login