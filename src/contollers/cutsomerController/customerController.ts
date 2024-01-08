import Router,{Request,Response} from 'express'
import express from 'express'
import EcCustomers from '../../../model/ec_customers.ts';
import EcCustomersModel from '../../../types/ec_customers.ts';

const postCustomerData=(req:Request,res:Response):void=>{
    let ecCustomers:EcCustomersModel =req.body
    EcCustomers.create(
      {...ecCustomers}
    )

    res.status(200).json({ message: `Data inserted successfully` });
  }
  
  export{postCustomerData}