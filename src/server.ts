import express, { urlencoded } from 'express';
import { Request, Response   } from 'express';
import sequelize from   './config/sequelize.ts';
import supplierRouteHandler from './routes/supplierRoutes.ts';
import customerRouteHandler from './routes/customerRoutes.ts';
import indexRouter from './routes/indexRoutes.ts';

const app = express();
const PORT = 3000;

(async ()=>{
await sequelize
    .sync({ force:false }) //set force to true to drop and recreate tables on every application start
    .then(() => {
      console.log("Database Synced");
    })
    .catch((error) => {
      console.error("Error syncing database:", error);
    });

  })();
 


app.listen(PORT, () => {
  console.log(`Server Started \nListening in port :${PORT}`);
});




app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/api/v1",supplierRouteHandler);
app.use("/api/v2",customerRouteHandler);
app.use(indexRouter)


// app.use("/api/v2",customerRouteHandler);



 // app.post("/sampleinsert",(req:Request,res:Response)=>{
// sampeInsert(req.body)
// res.status(200).json({ message: `Data received successfully` });
// })

// const sampeInsert=(ec_suppliers:EcSuppliersModel):void=>{
//   console.log(ec_suppliers)
//   EcSuppliers.create(
//     {...ec_suppliers}
//   )
// }


// app.get("/sampleinsert",async (req: Request, res: Response) => {
//   await getsampeInsert()
//     .then((response) => {
//       console.log(response)
//       res.send(response);
//     })
//     .catch((error) => {
//       res.status(500).send("Error retrieving data: " + error.message);
//     });
// });




// const getsampeInsert = async(): Promise<EcSuppliers[]|any> => {

//   const result = await EcSuppliers.findAll({
//     raw: true, // set raw:false for non formatted data
//   }).then((results) => {
//        console.log("Data retrieved successfully:", results);
//        return results;
//      })
//      .catch((error) => {
//        console.error("Error retrieving data:", error);
//      });

//      return result;
//  };
