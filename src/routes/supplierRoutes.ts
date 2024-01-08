import Router,{Request,Response} from 'express'
import express from 'express'
import EcSuppliers from '../../model/ec_suppliers.ts';
import { postSupplierData } from '../contollers/supplierController/supplierRegistration.ts';



const supplierRouteHandler = express.Router()

supplierRouteHandler.post("/",(req:Request,res:Response)=>{
  postSupplierData(req,res);

  })
  
  supplierRouteHandler.get("/",async (req: Request, res: Response) => {
    await getSupplierData()
      .then((response) => {
        console.log(response)
        res.send(response);
      })
      .catch((error) => {
        res.status(500).send("Error retrieving data: " + error.message);
      });
  });
  
  
 
  const getSupplierData = async(): Promise<EcSuppliers[]|any> => {
  
    const result = await EcSuppliers.findAll({
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
  

export default supplierRouteHandler