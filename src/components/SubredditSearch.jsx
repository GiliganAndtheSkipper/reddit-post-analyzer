import React, { useState } from 'react';
import './SubredditSearch.css';
import { decode } from 'he';
import PostDetail from './PostDetail';  // Import PostDetail component

const SubredditSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);  // State for selected post

  // Function to handle the search query
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://www.reddit.com/subreddits/search.json?q=${query}`);
      const data = await response.json();
      setResults(data.data.children.map(subreddit => ({
        name: subreddit.data.display_name_prefixed,
        url: subreddit.data.url,
        subscribers: subreddit.data.subscribers || 'Not available',
        activeUsers: subreddit.data.active_user_count || 'Not available',
        description: decode(subreddit.data.public_description || 'No description available'),
      })));
    } catch (error) {
      console.error('Error fetching subreddits:', error);
    }
  };

  // Function to fetch post details
  const fetchPostDetails = async (postUrl) => {
    try {
      const response = await fetch(`${postUrl}.json`);
      const postData = await response.json();
      setSelectedPost(postData[0].data.children[0].data);  // Store selected post data
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  };

  // Handle post click to view details
  const handlePostClick = (url) => {
    fetchPostDetails(`https://www.reddit.com${url}`);
  };

  return (
    <div className="subreddit-search">
      {!selectedPost ? (
        <>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              className="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter subreddit name or topic"
            />
            <button className="search-button" type="submit">Search</button>
          </form>

          <ul className="results-list">
            {results.map((subreddit) => (
              <li className="result-item" key={subreddit.name}>
                {/* Fetch post details within the app */}
                <button
                  className="result-link"
                  onClick={() => handlePostClick(subreddit.url)}  // Fetch post details in app
                >
                   Details
                </button>

                {/* Redirect to Reddit */}
                <a
                  className="result-link"
                  href={`https://www.reddit.com${subreddit.url}`}  // Redirect to Reddit
                  target="_blank"
                  rel="noopener noreferrer"
                >
                   Full Subreddit Post
                </a>

                <p>Subscribers: {subreddit.subscribers}</p>
                <p>Active Users: {subreddit.activeUsers || 'Not available'}</p>
                <p>Description: {subreddit.description || "No description available"}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <PostDetail post={selectedPost} setSelectedPost={setSelectedPost} />  // Render PostDetail component
      )}
    </div>
  );
};

export default SubredditSearch;
