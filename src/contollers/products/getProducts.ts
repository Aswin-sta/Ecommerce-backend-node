import { client } from "../../services/mongodb";
import { Db, ObjectId } from 'mongodb';
import { Request, Response } from "express";

const db: Db = client.db('ECommerce');

const getProductData = async (req: Request, res: Response): Promise<any> => {
    try {
        const { product_id }= req.query;

        if (!product_id) {
            res.status(400).json({ status: "Bad request" });
            return;
        }

        const productsCollection = db.collection('products');
        const filter= new ObjectId(product_id as string)
        const result = await productsCollection.find({ _id:filter}).toArray();
        console.log(result)
        res.send(result)

        
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ status: "Internal Server Error" });
    }
}

export default getProductData;
