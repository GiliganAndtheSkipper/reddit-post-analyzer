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
    <div>
      <h1>Search Subreddits</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a subreddit"
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {results.map((subreddit) => (
          <li key={subreddit.id}>
            <a href={`https://www.reddit.com${subreddit.url}`} target="_blank" rel="noopener noreferrer">
              {subreddit.display_name_prefixed}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubredditSearch;
