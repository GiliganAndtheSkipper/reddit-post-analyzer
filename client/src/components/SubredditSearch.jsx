import React, { useState } from 'react';
import './SubredditSearch.css';  // Import the styles for result cards
import PostDetail from './PostDetail';  // Ensure we still use PostDetail for detailed view
import './PostDetail.css';  // Import styles for post details

const SubredditSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);  // To show detailed post view
  const [showMore, setShowMore] = useState(false);

  // Function to handle search submission
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`https://www.reddit.com/subreddits/search.json?q=${query}`);
      const data = await response.json();
      setResults(data.data.children);  // Directly use data from the response
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
            <button className="primary-button" type="submit">Search</button>
          </form>

          {/* Show loading state */}
          {loading && <p>Loading...</p>}

          {/* Render search results */}
          <ul className="results-list">
            {results.slice(0, showMore ? results.length : 5).map((subreddit) => (
              <li className="result-item" key={subreddit.data.id}>
                <div className="result-card">
                  <div className="result-card-left">
                    {/* Placeholder image for subreddit */}
                    <img src="https://via.placeholder.com/150" alt="Subreddit" className="result-image" />
                  </div>
                  <div className="result-card-right">
                    <a
                      href={`https://www.reddit.com${subreddit.data.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="custom-link"
                    >
                      {subreddit.data.display_name_prefixed}
                    </a>
                    <p className="result-description">{subreddit.data.public_description}</p>
                    
                    {/* Button to view post details */}
                    <button
                      className="primary-button"
                      onClick={() => handlePostClick(subreddit.data.url)}
                    >
                      Details
                    </button>
                  </div>
                </div>
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
