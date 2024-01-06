import Router,{Request,Response} from 'express'
import express from 'express'
import EcSuppliers from '../../model/ec_suppliers.ts';
import EcSuppliersModel from '../../types/ec_suppliers.ts';
import EcCustomers from '../../model/ec_customers.ts';
import EcCustomersModel from '../../types/ec_customers.ts';


  
let LoginData :{
    e_mail: string,
    password: string,
    client_type: string,
  };

const indexRouter = express.Router();
indexRouter.post("/login",async (req:Request,res:Response)=>{

    LoginData=req.body

  if(LoginData.client_type==="supplier"){
            const result:EcSuppliersModel|null = await EcSuppliers.findOne({where: { e_mail: LoginData.e_mail} })
            if (result?.password===LoginData.password){
                res.send(result);
            }else{
                res.status(401).json("Inavlid client credentials")
            }
  }else if(LoginData.client_type==="customer"){
            const result:EcCustomersModel|null = await EcCustomers.findOne({where: { e_mail: LoginData.e_mail} })
            if (result?.password===LoginData.password){
                res.send(result);
            }else{
                res.status(401).json("Inavlid client credentials")
            }
  }else{
            res.status(422).json("Unprocessable entity")
  }

  })

  export default indexRouter