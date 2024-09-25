import './App.css';
import SubredditSearch from './components/SubredditSearch.jsx';
import './components/Footer.css';
import Sidebar from './components/Sidebar.jsx';
import { useState } from 'react';

function App() {
  // Declare states to hold search query and results
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Function to handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://www.reddit.com/subreddits/search.json?q=${query}`);
      const data = await response.json();
      if (data.error || !data.data.children.length) {
        setError('No results found. please try another query.');
      } else {
      setResults(data.data.children); 
    }
      setLoading(false);
    } catch (error) {
      setError('Error fetching subreddits. Please try again.');
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toDateString();
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-nav-container">
          <div className="logo-title-container">
            <img src={`${process.env.PUBLIC_URL}/logo512.png`} className="App-logo" alt="My Logo" />
            <h1 className="header-title">Subreddit Post Analyzer</h1>
          </div>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              className="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter subreddit name or topic"
            />
            <button className="primary-button" type="submit">Search</button>
            {query && (
              <button className="clear-button" type="button" onClick={clearSearch}>
                Clear
              </button>
            )}
          </form>
        </div>
      </header>
      
      <main className="app-content">
        <Sidebar />

        <section className="hero-section">
          {error && <p className="error-message">{error}</p>}
          {loading && <div className="spinner">Loading...</div>}

          {/* Search Results */}
          {!loading && results.length > 0 && (
          <ul className="results-list">
            {results.map((subreddit) => (
              <li key={subreddit.data.id} className="result-item">
                <img src={subreddit.data.icon_img || 'https://via.placeholder.com/50'} alt={subreddit.data.display_name} className="subreddit-icon" />
                <a href={`https://www.reddit.com${subreddit.data.url}`} target="_blank" rel="noopener noreferrer" className="result-link">
                  {subreddit.data.display_name_prefixed}
                </a>
                <p>{subreddit.data.public_description}</p>
                <p><strong>Subscribers:</strong> {subreddit.data.subscribers}</p>
                <p><strong>Created on:</strong> {formatDate(subreddit.data.created_utc)}</p>
              </li>
            ))}
          </ul>
          )}
          {!loading && !results.length && !error && <p>No search results yet. Try searching for something.</p>}
        </section>
      </main>

      <footer className="App-footer">
        <div className="logo-nav-container">
          <nav>
            <ul className="nav-links">
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default App;
