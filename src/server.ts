import express, { NextFunction} from 'express';
import sequelize from   './config/sequelize.ts';
import supplierRouteHandler from './routes/supplierRoutes.ts';
import customerRouteHandler from './routes/customerRoutes.ts';
import indexRouter from './routes/indexRoutes.ts';
import sequelizeSync from './services/sequelize.ts';
import { connectToMongoDb, stopMongoDb } from './services/mongodb.ts';


const app = express();
const PORT = 3000;
sequelizeSync();
connectToMongoDb();


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(express.json());

app.use(express.urlencoded({extended:true}))
// app.use((req,res,next:NextFunction)=>{
//   mwExample1(req,res,next)
// });
// app.use((req,res,next:NextFunction)=>{
//   mwExample2(req,res,next)
// });
app.get("/test", async (req, res) => {
  res.send("working");
});
app.use("/api/v1",supplierRouteHandler);
app.use("/api/v2",customerRouteHandler);
app.use(indexRouter)
// app.get("/mwexample",(req:CustomRequest,res)=>{
//   const customProperty=req.customProperty ?? 'not available'
//   res.send(`Response with modified request property:${customProperty}`);
// })

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
 process.on("SIGINT",()=>{
  sequelize.close;
  stopMongoDb();
 })

 process.on("exit",()=>{
  sequelize.close;
  stopMongoDb();
 })