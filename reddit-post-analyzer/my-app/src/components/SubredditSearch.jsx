import React, { useState } from 'react';
import './SubredditSearch.css'; 

const SubredditSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://www.reddit.com/subreddits/search.json?q=${query}`);
      const data = await response.json();
      setResults(data.data.children.map(subreddit => subreddit.data));
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
          placeholder="Enter subreddit name" /* Updated placeholder */
        />
        <button className="search-button" type="submit">Search</button>
      </form>

      <ul className="results-list">
        {results.map((subreddit) => (
          <li className="result-item" key={subreddit.id}>
            <a 
              className="result-link"
              href={`https://www.reddit.com${subreddit.url}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {subreddit.display_name_prefixed}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubredditSearch;
