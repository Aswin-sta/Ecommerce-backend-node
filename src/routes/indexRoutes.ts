import Router,{Request,Response} from 'express'
import express from 'express'
import login from '../contollers/authentication/login';


  


const indexRouter = express.Router();
indexRouter.post("/login",async (req:Request,res:Response)=>{
login(req,res);
  })

  export default indexRouter