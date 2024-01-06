import Router,{Request,Response} from 'express'
import express from 'express'
const router = express.Router()

type Person = {
    name: string,
    age: Number,
  };

let person:Person|null;

router.get("/", (req:Request, res:Response) => {
  // person = req.query; //use req.body to fetch body
  if (person === null || person === undefined) {
  res.send("no data for person");
  }else{
    res.send(person)
  }
});

router.post("/",  (req:Request, res:Response) => {
  person = req.body;
  res
    .status(200)
    .json({ message: `${person?.name}'s Data received successfully` });
});


export default router