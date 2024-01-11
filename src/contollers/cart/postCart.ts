import Router,{Request,Response} from 'express'
import express from 'express'
import EcCarts from '../../../model/ec_carts.ts';

const postCustomerCartData= async (req:Request,res:Response):Promise<any>=>{
try{
   
    const ec_carts = req.body as { product_id: string; registration_id:string; quantity: number }[];

   

    if(!ec_carts || ec_carts.length==0)
    {
      res.status(400).json({message:"bad Request"})
    }
    const{registration_id}=req.body.jwt_decoded
    console.log(registration_id)
   let  modified_ec_carts=ec_carts.map((cart) => {
      return {
          ...cart,
          registration_id: registration_id,
      };
  });

  console.log(modified_ec_carts)

    await EcCarts.bulkCreate(
      modified_ec_carts
    )
    res.status(200).json({ message: `Data inserted successfully` });}
    catch (error) {
      console.error("Error inserting customer data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

export {postCustomerCartData}








