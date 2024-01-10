import Router,{Request,Response} from 'express'
import express from 'express'
import EcSuppliers from '../../model/ec_suppliers.ts';
import { postSupplierData } from '../contollers/supplierController/supplierRegistration.ts';
import verifyJWT from '../middleware/verifyJWT.ts';
import { addProduct } from '../contollers/products/addProducts.ts';
import { getSupplierData } from '../contollers/supplierController/supplierRegistration.ts';
import updateProduct from '../contollers/products/editProducts.ts';
import getProductData from '../contollers/products/getProducts.ts';

const supplierRouteHandler = express.Router()

supplierRouteHandler.post("/register",(req:Request,res:Response)=>{
  postSupplierData(req,res);

  })
  
  supplierRouteHandler.get("/profile",verifyJWT,async (req: Request, res: Response) => {
    await getSupplierData(req,res)
      .then((response) => {
        console.log(response)
        res.send(response);
      })
      .catch((error) => {
        res.status(500).send("Error retrieving data: " + error.message);
      });
  });
  
  
 supplierRouteHandler.get("/viewProducts/:id",verifyJWT,(req:Request,res:Response)=>{
  getProductData(req,res);

  })
 supplierRouteHandler.post("/addProducts",verifyJWT,(req:Request,res:Response)=>{
  addProduct(req,res);

  })
 supplierRouteHandler.put("/updateProducts",verifyJWT,(req:Request,res:Response)=>{
  updateProduct(req,res);

  })

  

export default supplierRouteHandler