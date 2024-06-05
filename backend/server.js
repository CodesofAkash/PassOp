const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbName = 'passop';

app.get('/api', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('passOP-passwords');
    const findPasswords = await collection.find().toArray();
    res.json(findPasswords);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

app.post('/api', async (req, res) => {
  try {
    const password = req.body;
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('passOP-passwords');
    const feedback = await collection.insertOne(password);
    res.json({ success: true, result: feedback });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

app.delete('/api/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('passOP-passwords');
    const feedback = await collection.deleteOne({ idOfClient: id });
    res.json({ message: 'Item Deleted', result: feedback });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

module.exports.handler = serverless(app);
