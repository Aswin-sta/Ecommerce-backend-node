import Router,{Request,Response} from 'express'
import express from 'express'
import EcCarts from '../../../model/ec_carts.ts';

const putCustomerCartData= async (req:Request,res:Response):Promise<any>=>{
try{
  const ec_carts = req.body as { product_id: string; quantity: number }[];

   if(!ec_carts || ec_carts.length==0){
     res.status(400).json({message:"bad Request"})
   }
   const{registration_id}=req.body.jwt_decoded
   const result=await Promise.all(ec_carts.map(async (cart)=>{   
    return await EcCarts.update(
      { ...cart},
      { where: { product_id:cart.product_id,registration_id } }
    );
   }))
   const anyUpdateSuccessful = result.some(updatedRows => updatedRows[0] > 0);

   if (!anyUpdateSuccessful) {
     throw new Error("None updated");
   }
    res.status(200).json({ message: `Data updated successfully` });}
    catch (error) {
      console.error("Error updating customer data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

export {putCustomerCartData}