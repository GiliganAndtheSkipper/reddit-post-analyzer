const express = require('express');
const path = require('path');
const axios = require('axios'); 
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5002', optionsSuccessStatus: 200 })); // Update origin as needed

//MongoDB Connection Setup
const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");

    const databaseList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databaseList.databases.forEach(db => console.log(` - ${db.name}`));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

//Connect to the database when the server starts
connectToDatabase();

// Serve static files from the client/build directory
app.use(express.static(path.join(__dirname, '../client/build')));

// API endpoint for searching subreddits
app.get('/api/search-subreddits', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const response = await axios.get(`https://www.reddit.com/subreddits/search.json?q=${query}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching subreddits:', error.message || error);
    res.status(500).json({ message: 'Error fetching subreddits' });
  }
});

// API route using MongoDB
app.get('/api/some-data', async (req, res) => {
  try {
    const db = client.db("redditAnalyzerDB");
    const collection = db.collection("subreddits");

    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// For any other route, serve the React app's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).json({ message: 'Unexpected server error occurred.' });
});

// Set the port
const PORT = process.env.PORT || 5002;
app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});
