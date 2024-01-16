import { client } from "../../services/mongodb";
import { Db, ObjectId } from 'mongodb';
import { Request, Response } from "express";

const db: Db = client.db('ECommerce');

const getProductData = async (req: Request, res: Response): Promise<any> => {
    try {
     
        const { id } = req.query; // product id
        let query: Record<string, any> = {};

        if (id) {
            query = { _id: id };
        }
        else{
            query={}
        }

        const productsCollection = db.collection('products');
      
 
        const result = await productsCollection.find(query).toArray();
        console.log(result)
        res.send(result)

        
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ status: "Internal Server Error" });
    }
}

export default getProductData;
