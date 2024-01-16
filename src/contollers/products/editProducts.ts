import { client } from "../../services/mongodb";
import { Db, ObjectId } from 'mongodb';
import { Request, Response } from "express";
import { Socket } from "socket.io";
import { io } from "../../server";
const db: Db = client.db('ECommerce');

const updateProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { product_id }= req.body;

        if (!product_id) {
            res.status(400).json({ status: "Bad request" });
            return;
        }


       
        const productsCollection = db.collection('products');

        
        const updatedProductData = {
            ...req.body
        };


        delete updatedProductData.jwt_decoded
        delete updatedProductData.product_id

        // Assuming there's a unique identifier for the product, here assumed to be product_id
        const filter = { _id: new ObjectId(product_id as string) };
console.log(updatedProductData)
        const result = await productsCollection.updateMany(filter, { $set: updatedProductData });

        if (result.modifiedCount > 0) {
            if(req.body.product_stock==0){
                io.emit("product out of stock")
            }
            res.status(200).json({ message: "Update successful" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ status: "Internal Server Error" });
    }
}

export default updateProduct;
