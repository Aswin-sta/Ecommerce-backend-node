import Router,{Request,Response} from 'express'
import express from 'express'
import EcCustomers from '../../model/ec_customers.ts';
import EcCustomersModel from '../../types/ec_customers.ts';
import { postCustomerData } from '../contollers/cutsomerController/customerController.ts';
import verifyJWT from '../middleware/verifyJWT.ts';
import { getCustomerData } from '../contollers/cutsomerController/customerController.ts';
import { postCustomerCartData } from '../contollers/cart/postCart.ts';
import { getCustomerCartData } from '../contollers/cart/getCart.ts';
import { putCustomerCartData } from '../contollers/cart/putCart.ts';
import getProductData from '../contollers/products/getProducts.ts';
import multer, { memoryStorage } from 'multer';
import { checkoutCart } from '../contollers/cart/checkoutCart.ts';
const customerRouteHandler= express.Router();

const storage=multer.memoryStorage();
const upload=multer({storage:storage})

customerRouteHandler.post("/register",upload.single("profile_pic"),(req:Request,res:Response)=>{
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
    
    customerRouteHandler.get("/viewProduct",verifyJWT,(req:Request,res:Response)=>{
      getProductData(req,res);
      })
    customerRouteHandler.post("/cart/addProduct",verifyJWT,(req:Request,res:Response)=>{
      postCustomerCartData(req,res);
      })
      
   
      customerRouteHandler.get("/cart/viewCart",verifyJWT,(req:Request,res:Response)=>{
        getCustomerCartData(req,res);
        })
           
   
      customerRouteHandler.put("/cart/updateCart",verifyJWT,(req:Request,res:Response)=>{
        putCustomerCartData(req,res);
        })
           
      customerRouteHandler.post("/cart/checkout",verifyJWT,(req:Request,res:Response)=>{
        checkoutCart(req,res);
        })
           
      
    
   
    
  
  export default customerRouteHandler