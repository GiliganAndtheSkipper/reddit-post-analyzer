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

  // Function to handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
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
          </form>
        </div>
      </header>
      
      <main className="app-content">
        <Sidebar />

        {/* Hero Section is now used to display search results */}
        <section className="hero-section">
          {/* Loading spinner */}
          {loading ? <p>Loading...</p> : null}

          {/* Search Results */}
          <ul>
            {results.map((subreddit) => (
              <li key={subreddit.data.id}>
                <a href={`https://www.reddit.com${subreddit.data.url}`} target="_blank" rel="noopener noreferrer">
                  {subreddit.data.display_name_prefixed}
                </a>
                <p>{subreddit.data.public_description}</p>
              </li>
            ))}
          </ul>
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
