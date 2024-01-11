import Router,{Request,Response} from 'express'
import express from 'express'
import EcCarts from '../../../model/ec_carts.ts';
import EcCartsModel from '../../../types/ec_carts.ts';

const getCustomerCartData= async (req:Request,res:Response):Promise<any>=>{
try{
  const{registration_id}=req.body.jwt_decoded;
  const result=  await EcCarts.findAll({where:{registration_id}})
    res.status(200).json({  result});}
    catch (error) {
      console.error("Error inserting customer data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

export {getCustomerCartData}