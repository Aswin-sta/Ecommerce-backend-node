import Router,{Request,Response} from 'express'
import express from 'express'
import EcSuppliers from '../../../model/ec_suppliers.ts';
import EcSuppliersModel from '../../../types/ec_suppliers.ts';

const postSupplierData=(req:Request,res:Response):void=>{
try{
    let ecSuppliers:EcSuppliersModel=req.body
    EcSuppliers.create(
      {...ecSuppliers}
    )
    res.status(200).json({ message: `Data inserted successfully` });}
    catch (error) {
      console.error("Error inserting customer data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }


  const getSupplierData = async(req:Request,res:Response): Promise<EcSuppliers[]|any> => {
    const {registration_id}=req.body.jwt_decoded
    const result = await EcSuppliers.findOne({where:{registration_id},
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
  

  export {getSupplierData,postSupplierData}
  