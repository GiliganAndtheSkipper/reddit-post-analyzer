const express = require('express');
const path = require('path');
const axios = require('axios'); 
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { title } = require('process');
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

// API endpoint for fetching detailed Reddit posts
app.get('/api/search-posts', async (req, res) => {
  const { query, type } = req.query;

  if (!query || !type) {
    return res.status(400).json({ message: 'Both query and type parameters are required' });
  }

  try {
    let url = '';
    if (type === 'subreddit') {
      url = `https://www.reddit.com/r/${query}/.json`;
    } else if (type === 'author') {
      url = `https://www.reddit.com/user/${query}/submitted.json`;
    } else {
      return res.status(400).json({ message: 'Invalid type parameter. Must be "subreddit" or "author"' });
    }

    const response = await axios.get(url);

    // relevant data from Reddit API response
    const posts = response.data.data.children.map(post => {
      const postData = post.data;
      return {
        title: postData.title,
        author: postData.author,
        subreddit: postData.subreddit,
        content: postData.selftext,
        score: postData.score,
        num_comments: postData.num_comments,
        permalink: `https://www.reddit.com${postData.permalink}`,
        created_utc: new Date(postData.created_utc * 1000).toLocaleString(),
        thumbnail: postData.thumbnail,
        post_hint: postData.post_hint,
        url: postData.url
      };
    });

    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error.message || error);
    res.status(500).json({ message: 'Error fetching posts' });
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
