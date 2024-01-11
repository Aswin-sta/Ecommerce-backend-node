import { client } from "../../services/mongodb";
import { Db, ObjectId } from 'mongodb';
import { Request, Response } from "express";

const db: Db = client.db('ECommerce');

const getProductData = async (req: Request, res: Response): Promise<any> => {
    try {
        // const{client_type}=req.body.jwt_decoded
        // if (client_type !== 'customer') {
        //     res.status(401).json({ status: "Unauthorized", message: "Invalid client type" });
        //     return;
        //   }
        // const { id }= req.params; //product id

        const productsCollection = db.collection('products');
        const query: Record<string, any> = {};
 
        const result = await productsCollection.find({}).toArray();
        console.log(result)
        res.send(result)

        
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ status: "Internal Server Error" });
    }
}

export default getProductData;
