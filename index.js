const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server Started \nListening in port :${PORT}`);
});

let person = {
  name: string,
  age: Number,
};

app.get("/", (req, res) => {
  // person = req.query; //use req.body to fetch body
  res.send(person);
});

app.post("/", (req, res) => {
  person = req.body;
  res
    .status(200)
    .json({ message: `${person.name}'s Data received successfully` });
});
