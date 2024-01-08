import { NextFunction,urlencoded } from 'express';
import { Request, Response   } from 'express';
interface CustomRequest extends Request{
    customProperty?:string;
  }

export const mwExample1=(req:CustomRequest,res:Response,next:NextFunction)=>{

    req.customProperty="sample custom property"
    next();
    
}


export const mwExample2=(req:CustomRequest,res:Response,next:NextFunction)=>{

    res.setHeader('Content-Type','application/json')
    res.setHeader('Set-Cookie',['type=ninja','language=javascript'])
    next();
    
}
