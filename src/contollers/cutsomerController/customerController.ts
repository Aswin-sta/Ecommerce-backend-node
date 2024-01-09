import Router,{Request,Response} from 'express'
import express from 'express'
import EcCustomers from '../../../model/ec_customers.ts';
import EcCustomersModel from '../../../types/ec_customers.ts';

const postCustomerData = async (req: Request, res: Response): Promise<void> => {
  try {
    let ecCustomers: EcCustomersModel = req.body;
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
  export{postCustomerData,getCustomerData}