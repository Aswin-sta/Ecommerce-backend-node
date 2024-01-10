import { client } from "../../services/mongodb";
import { Db, ObjectId } from 'mongodb';
import { Request, Response } from "express";

const db: Db = client.db('ECommerce');

const getProductData = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id }= req.params; //product id

        const productsCollection = db.collection('products');
        const query: Record<string, any> = {};
        if(id){
        const filter= new ObjectId(id as string)
        query._id = filter;
        }
        console.log(query)
        const result = await productsCollection.find(query).toArray();
        console.log(result)
        res.send(result)

        
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ status: "Internal Server Error" });
    }
}

export default getProductData;
