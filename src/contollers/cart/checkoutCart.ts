import {Request,Response} from 'express'
import Stripe from 'stripe'
import EcCarts from '../../../model/ec_carts.ts';
import EcBills from '../../../types/ec_bills.ts';
import { Db, ObjectId } from 'mongodb';
import { client } from "../../services/mongodb";
import EcCustomers from '../../../types/ec_customers.ts';
import { errorCode } from 'aws-sdk/clients/ivs';


const fs = require("fs");

type JoinedCart = EcCarts & EcCustomers;



const checkoutCart= async (req:Request,res:Response):Promise<any>=>{

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const stripe = new Stripe('sk_test_51ORUlBSHq5EqE6NlIIjtrUNg8XYq8VrbZuIYgHEInSPs2qbOiZv1fhWLbLiUX6ykWfuY2Y3KWlVbhtUACEYRk3oO003KVzBoKC', {
        apiVersion: '2023-10-16',
      });

      try{

      const db: Db = client.db('ECommerce');

      const{registration_id}=req.body.jwt_decoded;

      EcCustomers.hasMany(EcCarts, { foreignKey: "registration_id" });
      EcCarts.belongsTo(EcCustomers, { foreignKey: "registration_id",targetKey: 'registration_id'});

      const result =  await EcCarts.findAll({
        where: { registration_id },
        include: [
            {
              model: EcCustomers,
              required: true,
            },
          ],
          raw: true,
        }
      )

console.log(result)
if(result){

  const csvHeaders = "Item, Price, Quantity";
  let csvData = '';
  
  const cartProductPriceQunatity = await Promise.all(result.map(async (cv) => {
    const product = await db.collection('products').findOne({ _id: new ObjectId(cv.product_id) });
    
    
    csvData += `${product?.product_name}, ${product?.product_price}, ${cv.quantity}\n`;
  
    
    
    return product?.product_price*cv.quantity;
  }));
  
  const completeCsv = `${csvHeaders}\n${csvData}`;
  const filePath = "D:/nodeJS/Ecommerce-backend-node/bills/output.csv";

  
const totalPrice = cartProductPriceQunatity.reduce((acc, price) => {
 
    return acc + (price || 0);
}, 0);

  const paymentIntent = await stripe.paymentIntents.create({
          amount: totalPrice,
          currency: 'inr',
          payment_method: 'pm_card_visa',
          confirm: true,
          return_url: 'http://127.0.0.1:5500/index.html',
        });

        fs.writeFile(filePath, completeCsv, (err:errorCode) => {
          if (err) {
            console.error("Error writing CSV file:", err);
          } else {
            console.log(`CSV file (${filePath}) created successfully.`);
          }
        });

       

        res.status(200).json({
          message: "success",
          stripe_id: paymentIntent.id,
      });
    }
      
}
catch{
    res.status(500).json("Internal server error");
  }
}

    export {checkoutCart}
      
 
      
        







    
    
    
