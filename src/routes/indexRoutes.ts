import Router,{Request,Response} from 'express'
import express from 'express'
import {login,resetpassword} from '../contollers/authentication/login';
import verifyJWT from '../middleware/verifyJWT.ts';

  
const indexRouter = express.Router();
indexRouter.post("/login",async (req:Request,res:Response)=>{
login(req,res);
  })

  indexRouter.patch("/resetpassword",verifyJWT,async (req:Request,res:Response)=>{
    resetpassword(req,res);
      })
  export default indexRouter