import React, { useState } from 'react';
import './SubredditSearch.css';
import { decode } from 'he';
import PostDetail from './PostDetail';

const SubredditSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showMore, setShowMore] = useState(false);

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

  const fetchPostDetails = async (postUrl) => {
    try {
      const response = await fetch(`${postUrl}.json`);
      const postData = await response.json();
  
      console.log('postData:', postData);  // Log the response structure
  
      // Now, safely access the post data
      if (
        postData && 
        postData.data && 
        postData.data.children && 
        postData.data.children.length > 0
      ) {
        const postDetails = postData.data.children[0].data;  
        setSelectedPost(postDetails);
      } else {
        console.error('Unexpected data structure or empty data', postData);
        setSelectedPost(null);
      }
    } catch (error) {
      console.error('Error fetching post details:', error);
      setSelectedPost(null);
    }
  };
    
  const handlePostClick = (url) => {
    fetchPostDetails(`https://www.reddit.com${url}`);
  };

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
            <button className="search-button" type="submit">Search</button>
          </form>

          <ul className="results-list">
            {results.slice(0, showMore ? results.length : 5).map((subreddit) => (
              <li className="result-item" key={subreddit.name}>
                <button
                  className="result-link"
                  onClick={() => handlePostClick(subreddit.url)}
                >
                   Details
                </button>

                <a
                  className="result-link"
                  href={`https://www.reddit.com${subreddit.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                   Full Post
                </a>

                <p>Subscribers: {subreddit.subscribers}</p>
                <p>Active Users: {subreddit.activeUsers || 'Not available'}</p>
                <p>Description: {subreddit.description || "No description available"}</p>
              </li>
            ))}
          </ul>

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
