const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
const cors = require('cors')

dotenv.config()

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())
client.connect();

// console.log(process.env.MONGO_URI) // remove this after you've confirmed it is working

//Show all passwords
app.get('/', async(req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passOP-passwords");
  const findPasswords = await collection.find().toArray();
  res.json(findPasswords)
})

//Save a password
app.post('/', async(req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passOP-passwords");
  const feedback = await collection.insertOne(password);
  res.json({success: true, result: feedback})
})

//Delete a password by id
app.delete('/:id', async(req, res) => {
  const id = req.params.id;
  const db = client.db(dbName);
  const collection = db.collection("passOP-passwords");
  const feedback = await collection.deleteOne({idOfClient :id});
  res.send({message: "Item Deleted", result: feedback})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})