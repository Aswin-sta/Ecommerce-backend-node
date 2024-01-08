import Router,{Request,Response} from 'express'
import express from 'express'
import EcCustomers from '../../model/ec_customers.ts';
import EcCustomersModel from '../../types/ec_customers.ts';
import { postCustomerData } from '../contollers/cutsomerController/customerController.ts';
import verifyJWT from '../middleware/verifyJWT.ts';
const customerRouteHandler= express.Router();


customerRouteHandler.post("/",(req:Request,res:Response)=>{
    postCustomerData(req,res);
    })
    
    customerRouteHandler.get("/",verifyJWT,async (req: Request, res: Response) => {
        console.log("customer called")
        const {registration_id}=req.body.jwt_decoded
      await getCustomerData(registration_id)
        .then((response) => {
          console.log(response)
          res.send(response);
        })
        .catch((error) => {
          res.status(500).send("Error retrieving data: " + error.message);
        });
    });
    
    
    const getCustomerData = async(registration_id:string): Promise<EcCustomersModel[]|any> => {
    
      const result = await EcCustomers.findOne({where:{registration_id},
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