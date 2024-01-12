import Router,{Request,Response} from 'express'
import express from 'express'
import EcSuppliers from '../../../model/ec_suppliers.ts';
import EcSuppliersModel from '../../../types/ec_suppliers.ts';
import multer from 'multer';
import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { ManagedUpload } from 'aws-sdk/clients/s3';
const postSupplierData=(req:Request,res:Response):void=>{
try{
    let ecSuppliers:EcSuppliersModel=req.body
    
  
    const accessKeyId = 'AKIA5IOGN2NXNVX6UNHV';
    const secretAccessKey = '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';
    
   
   const s3= new AWS.S3({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    });


    const file=req.file as Express.Multer.File

    if(file){
      const params : AWS.S3.PutObjectRequest={
        Bucket: "ecommercebucket1",
        Key: file?.originalname,
        Body: Readable.from(file?.buffer),
        ContentType: file?.mimetype,
      }


      s3.upload(params, (err: Error, data: ManagedUpload.SendData) => {
        if (err) {
        
          console.log(err)
        } else {
         ecSuppliers.profile_pic=data.Location
          console.log(data)
        }
      });

    }

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
  