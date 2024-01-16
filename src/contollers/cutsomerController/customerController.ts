import Router,{Request,Response} from 'express'
import express from 'express'
import EcCustomers from '../../../model/ec_customers.ts';
import EcCustomersModel from '../../../types/ec_customers.ts';
import AWS from 'aws-sdk';
import { Readable } from 'stream';
import { ManagedUpload } from 'aws-sdk/clients/s3';
const postCustomerData = async (req: Request, res: Response): Promise<void> => {
  try {
    let ecCustomers: EcCustomersModel = req.body;

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

      const profile_pic_url = await s3UploadAsync(s3, params);
      ecCustomers.profile_pic = profile_pic_url.Location;
    

    }

    await EcCustomers.create({ ...ecCustomers });

    res.status(200).json({ message: `Data inserted successfully` });
  } catch (error) {
    console.error("Error inserting customer data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



const getCustomerData = async(req: Request, res: Response): Promise<EcCustomersModel[]|any> => {
    try{
      const {registration_id}=req.body.jwt_decoded
  const result = await EcCustomers.findOne({where:{registration_id},
    raw: true, // set raw:false for non formatted data
  }).then((results) => {
       console.log("Data retrieved successfully:", results);
       return results;
     })
     .catch((error) => {
       console.error("Error retrieving data:", error);
     });

     return result;
    } catch (error) {
      console.error("Error inserting customer data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
 };


 const s3UploadAsync = (s3:AWS.S3,params: AWS.S3.PutObjectRequest): Promise<ManagedUpload.SendData> => {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err: Error, data: ManagedUpload.SendData) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

  export{postCustomerData,getCustomerData}