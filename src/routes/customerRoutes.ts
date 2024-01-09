import Router,{Request,Response} from 'express'
import express from 'express'
import EcCustomers from '../../model/ec_customers.ts';
import EcCustomersModel from '../../types/ec_customers.ts';
import { postCustomerData } from '../contollers/cutsomerController/customerController.ts';
import verifyJWT from '../middleware/verifyJWT.ts';
import { getCustomerData } from '../contollers/cutsomerController/customerController.ts';
const customerRouteHandler= express.Router();


customerRouteHandler.post("/register",(req:Request,res:Response)=>{
    postCustomerData(req,res);
    })
    
    customerRouteHandler.get("/info",verifyJWT,async (req: Request, res: Response) => {
        console.log("customer called")
      await getCustomerData(req,res)
        .then((response) => {
          console.log(response)
          res.send(response);
        })
        .catch((error) => {
          res.status(500).send("Error retrieving data: " + error.message);
        });
    });
    
    
   
    
  
  export default customerRouteHandler