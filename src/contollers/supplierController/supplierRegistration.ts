import Router,{Request,Response} from 'express'
import express from 'express'
import EcSuppliers from '../../../model/ec_suppliers.ts';
import EcSuppliersModel from '../../../types/ec_suppliers.ts';

const postSupplierData=(req:Request,res:Response):void=>{

    let ecSuppliers:EcSuppliersModel=req.body
    EcSuppliers.create(
      {...ecSuppliers}
    )
    res.status(200).json({ message: `Data inserted successfully` });
  }

  export {postSupplierData}
  