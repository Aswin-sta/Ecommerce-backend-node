// import { Request, Response } from 'express';
// import { Db } from 'mongodb';
// import { client } from "../../services/mongodb.ts"
// import { ParsedQs } from 'qs';
// import { searchQueryType } from '../../../types/productTypes/index.ts';

// let db: Db = client.db("e-commerce");

// // Define the route to get products
// const getProductsSupplier = async (req: Request, res: Response) => {
//     try {
//         const supplierRegId = req.query.supplier_reg_id as string;

//         const { offset, sortBy, sortOrder, search }: ParsedQs = req.query


//         if (!supplierRegId) {
//             // If supplier_name is not provided in the request body, return an error
//             return res.status(422).json({ error: 'Supplier Registration ID required in the request' });
//         }

       
//         let searchQuery: searchQueryType = { supplier_reg_id: supplierRegId }
//         if (search) {

//             const regex = new RegExp(search as string, 'i');

//             const collectionKeys: string[] = ["product_name", "product_category"];

            
//                 searchQuery.$or = collectionKeys.map(key => ({ [key]: { $regex: regex } }));
//         }

// let skip:number=0;
// let sorting={};

// if(offset){
//     skip=parseInt(offset as string);
// }


// if(sortBy &&sortOrder){
//     sorting={[sortBy as string]:parseInt(sortOrder as string)}
//     }
//         let products = await db.collection('products').find(searchQuery,{
//           projection: {
//             product_name: 1,
//             product_category: 1,
//             product_price: 1,
//             product_stock: 1,
//             product_photo: 1,
//             _id: 1
//           }
//         }).skip(skip).limit(10).sort(sorting).toArray();




//         res.status(200).json({ products });
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// export { getProductsSupplier };
