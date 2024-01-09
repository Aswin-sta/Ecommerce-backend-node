import { client } from "../../services/mongodb";
import { MongoClient, ServerApiVersion, Db } from 'mongodb';
import { Request,Response } from "express";

const db:Db=client.db('Ecommerce')

const updateProduct=async (req:Request,res:Response):Promise<any>=>{
    try{
        const{product_name,product_category,product_photo,product_stock,...other_data}=req.body;
    
        if (!product_name || !product_category || !product_stock) {
            res.status(400).json({ status: "Bad request" });
        }
    
    const productsCollection=db.collection('products')
    const supplier_id=req.body.jwt_decoded
    const productData = {
        supplier_id,
        product_name,
        product_category,
        product_stock,
        product_photo: Buffer.from(product_photo, 'base64'),
        ...other_data,
    };
    
    delete productData.jwt_decoded
    
    await productsCollection.insertOne(productData);
    
    res.status(200).json({message:"Insertion succesful"})
        }
        catch(error){
            return res.status(500).json({ status: "Internal Server Error" });
        }
}