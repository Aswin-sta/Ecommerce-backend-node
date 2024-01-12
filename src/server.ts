import express, { NextFunction} from 'express';
import sequelize from   './config/sequelize.ts';
import supplierRouteHandler from './routes/supplierRoutes.ts';
import customerRouteHandler from './routes/customerRoutes.ts';
import indexRouter from './routes/indexRoutes.ts';
import sequelizeSync from './services/sequelize.ts';
import { connectToMongoDb, stopMongoDb } from './services/mongodb.ts';
import cors from 'cors'
import {createServer} from 'node:http'
import initializeSocket from './services/socket.ts';

const app = express();
const server=createServer(app)
const PORT = 3000;
const SOCKETPORT = 3001;

sequelizeSync();
connectToMongoDb();
const io =initializeSocket(server);

   io.on('connection', (socket) => {
        console.log('a user connected');
      
        socket.emit('event emitted',"hellooooo")
      
        socket.on('button clicked',()=>{
          console.log("Request from front end");
          socket.emit("reponse from backend","hello from backend")
          console.log("user disconected");
        })
        socket.on('disconnect',()=>{
          console.log("user disconected");
        })
      
      });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); //for socket 
});
server.listen(SOCKETPORT, () => {
  console.log(`Server is running on http://localhost:${SOCKETPORT}`); //for socket 
});
app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.get("/test/:para", (req, res) => {
  const {para} = req.params;
  res.send(`Working, received: ${para}`);
});
// app.use((req,res,next:NextFunction)=>{
//   mwExample1(req,res,next)
// });
// app.use((req,res,next:NextFunction)=>{
//   mwExample2(req,res,next)
// });

app.use("/api/v1",supplierRouteHandler);
app.use("/api/v2",customerRouteHandler);
app.use(indexRouter)

const corsOptions = {
  origin: "*",
  methods: "GET,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "application/json"],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));


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
  process.exit();
 })

 process.on("exit",()=>{
  sequelize.close;
  stopMongoDb();
 })

 export {io}