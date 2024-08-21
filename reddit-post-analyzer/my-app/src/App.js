import './App.css';
import SubredditSearch from './components/SubredditSearch.jsx';
import './components/Footer.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
     
        <div className="logo-nav-container">
        <img src={`${process.env.PUBLIC_URL}/logo512.png`} className="App-logo" alt="My Logo" /> 
        <h1 className="header-title">Subreddit Post Analyzer</h1>
          <nav>
            <ul className="nav-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <section className="hero-section">
          <h2>Get Insights on Your Favorite Subreddits</h2>
          
          <SubredditSearch />
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
