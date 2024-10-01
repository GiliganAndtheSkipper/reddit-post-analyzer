import React, { useState } from 'react';
import './SubredditSearch.css';  
import PostDetail from './PostDetail';  
import './PostDetail.css';  

const SubredditSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);  
  const [showMore, setShowMore] = useState(false);

  const trackEngagement = (eventType, query) => {
    const data = {
      event: eventType,
      query: query,
      timestamp: new Date().toISOString()
    };
  
    fetch('http://localhost:5002/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    .then(response => {
      if (response.ok) {
        console.log('Tracking data sent successfully')
      } else {
        console.error('Error sending tracking data');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  
  // Function to handle search submission
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    trackEngagement('search_action', query);
    try {
      const response = await fetch(`https://www.reddit.com/subreddits/search.json?q=${query}`);
      const data = await response.json();
      setResults(data.data.children);  
      setLoading(false);
    } catch (error) {
      console.error('Error fetching subreddits:', error);
      setLoading(false);
    }
  };

  // Function to fetch post details
  const fetchPostDetails = async (postUrl) => {
    try {
      const response = await fetch(`${postUrl}.json`);
      const postData = await response.json();
  
      if (postData && Array.isArray(postData) && postData.length > 0) {
        const postDetails = postData[0].data.children?.[0]?.data;
        if (postDetails) {
          setSelectedPost(postDetails);  // Set the selected post for detailed view
        } else {
          console.error('No post details found', postData);
          setSelectedPost(null);
        }
      } else {
        console.error('Unexpected data structure or empty data', postData);
        setSelectedPost(null);
      }
    } catch (error) {
      console.error('Error fetching post details:', error);
      setSelectedPost(null);
    }
  };

  // Function to handle clicking on post detail
  const handlePostClick = (url) => {
    fetchPostDetails(`https://www.reddit.com${url}`);
  };

  // Toggle "show more" for search results
  const toggleShowMore = () => {
    setShowMore(!showMore);
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
            <button 
              className="primary-button" 
              type="submit"
              onClick={handleSearch} 
              onPointerDown={handleSearch} // Handles touch events for mobile
            >
              Search
            </button>
          </form>

          {/* Show loading state */}
          {loading && <p>Loading...</p>}

          {/* Render search results */}
          <ul className="results-list">
            {results.slice(0, showMore ? results.length : 5).map((subreddit) => (
              <li className="result-item" key={subreddit.data.id}>
                {/* Display subreddit icon */}
                <img
                  src={subreddit.data.icon_img || 'https://via.placeholder.com/50'}
                  alt={subreddit.data.display_name}
                  className="subreddit-icon"
                />

                {/* Subreddit content and description */}
                <div className="result-item-content">
                  <a
                    href={`https://www.reddit.com${subreddit.data.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="result-link"
                  >
                    {subreddit.data.display_name_prefixed}
                  </a>
                  <p className="result-description">
                    {subreddit.data.public_description || "No description available"}
                  </p>

                  {/* Display subscriber count and creation date */}
                  <div className="result-metrics">
                    <span><strong>Subscribers:</strong> {subreddit.data.subscribers.toLocaleString()}</span>
                    <span><strong>Created on:</strong> {new Date(subreddit.data.created_utc * 1000).toLocaleDateString()}</span>
                  </div>
                </div>
                <button
                  className="primary-button"
                  onClick={() => handlePostClick(subreddit.data.url)}
                >
                  Details
                </button>
              </li>
            ))}
          </ul>

          {/* Show More/Show Less toggle */}
          {results.length > 5 && (
            <button onClick={toggleShowMore}>
              {showMore ? 'Show Less' : 'Show More'}
            </button>
          )}
        </>
      ) : (
        <PostDetail post={selectedPost} setSelectedPost={setSelectedPost} />
      )}
    </div>
  );
};

export default SubredditSearch;
