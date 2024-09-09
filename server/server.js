const express = require('express');
const path = require('path');
const axios = require('axios'); // To make HTTP requests to Reddit's API
const app = express();

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint for searching subreddits
app.get('/api/search-subreddits', async (req, res) => {
  const query = req.query.q;

  try {
    // Make a request to Reddit's API to search for subreddits
    const response = await axios.get(`https://www.reddit.com/subreddits/search.json?q=${query}`);
    
    // Send back the list of subreddits
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching subreddits:', error.message || error);
    res.status(500).json({ message: 'Error fetching subreddits' });
  }
});

// For any other route, serve the React app's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Ensure this path is correct
});

// Set the port
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
