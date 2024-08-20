import React, { useState } from 'react';
import './SubredditSearch.css';
import { decode } from 'he';

const SubredditSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://www.reddit.com/subreddits/search.json?q=${query}`);
      const data = await response.json();
      setResults(data.data.children.map(subreddit => ({
        name: subreddit.data.display_name_prefixed,
        url: subreddit.data.url,
        subscribers: subreddit.data.subscribers || 'Not available',  // Fallback for subscribers
        activeUsers: subreddit.data.active_user_count || 'Not available',  // Fallback for active users
        description: decode(subreddit.data.public_description || 'No description available'),  // Decode description
      })));
    } catch (error) {
      console.error('Error fetching subreddits:', error);
    }
  };

  return (
    <div className="subreddit-search">
       {/* <h1>Search Subreddits</h1> */}
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
            <a 
              className="result-link"
              href={`https://www.reddit.com${subreddit.url}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {subreddit.name}
            </a>
            <p>Subscribers: {subreddit.subscribers}</p>
            <p>Active Users: {subreddit.activeUsers || 'Not available'}</p>
            <p>Description: {subreddit.description || "No description available"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubredditSearch;
