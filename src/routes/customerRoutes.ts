import Router,{Request,Response} from 'express'
import express from 'express'
import EcCustomers from '../../model/ec_customers.ts';
import EcCustomersModel from '../../types/ec_customers.ts';
import { postCustomerData } from '../contollers/cutsomerController/customerController.ts';
const customerRouteHandler= express.Router();


customerRouteHandler.post("/",(req:Request,res:Response)=>{
    postCustomerData(req,res);
    })
    
    customerRouteHandler.get("/",async (req: Request, res: Response) => {
        console.log("customer called")
      await getCustomerData()
        .then((response) => {
          console.log(response)
          res.send(response);
        })
        .catch((error) => {
          res.status(500).send("Error retrieving data: " + error.message);
        });
    });
    
    
    const getCustomerData = async(): Promise<EcCustomersModel[]|any> => {
    
      const result = await EcCustomers.findAll({
        raw: true, // set raw:false for non formatted data
      }).then((results) => {
           console.log("Data retrieved successfully:", results);
           return results;
         })
         .catch((error) => {
           console.error("Error retrieving data:", error);
         });
    
         return result;
     };
    
  
  export default customerRouteHandler