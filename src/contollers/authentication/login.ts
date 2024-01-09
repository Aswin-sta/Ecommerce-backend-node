import Router,{Request,Response} from 'express'
import EcSuppliers from '../../../model/ec_suppliers.ts';
import EcSuppliersModel from '../../../types/ec_suppliers.ts';
import EcCustomers from '../../../model/ec_customers.ts';
import EcCustomersModel from '../../../types/ec_customers.ts';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
let loginData :{
    e_mail: string,
    password: string,
    client_type: string, 
  };
const login=async (req:Request,res:Response):Promise<void> =>{
    loginData=req.body

    if(loginData.client_type==="supplier"){
              const result:EcSuppliersModel|null = await EcSuppliers.findOne({where: { e_mail: loginData.e_mail} })
              if (result && bcrypt.compareSync(loginData.password, result.password)){
                  const token = jwt.sign(
                      { registration_id: result.registration_id, client_type:loginData.client_type },
                      'your-secret-key', // Replace with your secret key
                      { expiresIn: '24h' } // Token expiration time
                    );
                  res.status(200).json({"status":"login succesful","token":token,"expiry":"24h"});
              }else{
                  res.status(401).json("Invalid client credentials")
              }
    }else if(loginData.client_type==="customer"){
      const result:EcCustomersModel|null = await EcCustomers.findOne({ where: { e_mail: loginData.e_mail } });

      if (result && bcrypt.compareSync(loginData.password, result.password)) {
                  const token = jwt.sign(
                      { registration_id: result.registration_id, client_type:loginData.client_type },
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




const resetpassword=async (req:Request,res:Response):Promise<void> =>{
    const{e_mail,new_password,}=req.body
    console.log(req.body.jwt_decoded)
    const{client_type}=req.body.jwt_decoded
try{
    if(client_type==="supplier"){
      const hashedPassword = bcrypt.hashSync(new_password, bcrypt.genSaltSync(10));
              await EcSuppliers.update({password:hashedPassword},{where: { e_mail: e_mail} })
              
                  res.status(200).json({"status":"password changed succesfully"});
              
            
    }else if(client_type==="customer"){
      const hashedPassword = bcrypt.hashSync(new_password, bcrypt.genSaltSync(10));
      await EcCustomers.update({password:hashedPassword},{where: { e_mail} })
      res.status(200).json({"status":"password changed succesfully"});
             
    }else{
      res.status(401).json("Invalid client credentials");
    }
  }
  catch{
    res.status(500).json("Internal server error");
  }
  
}

export  {resetpassword,login}
