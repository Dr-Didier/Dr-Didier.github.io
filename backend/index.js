var express = require('express');
var app = express();
const {MongoClient} = require('mongodb');
const uri = "mongodb://127.0.0.1:27017/Test"
const client = new MongoClient(uri);
var cors = require('cors');

app.use(cors())

app.get("/url", async (req, res, next) => {
  res.json(
     await list(client));
 }); 


app.listen(3000, () => {
 console.log("Server running on port 3000");
});

async function list(client) {
  await client.connect()
  const result2 = await client.db("Test").collection("Test").find({}).toArray();
console.log(result2);
  return result2
}
