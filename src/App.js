import './App.css';
import SubredditSearch from './components/SubredditSearch.jsx';
import './components/Footer.css';
import Sidebar from './components/Sidebar.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-nav-container">
          <div className="logo-title-container">
            <img src={`${process.env.PUBLIC_URL}/logo512.png`} className="App-logo" alt="My Logo" />
            <h1 className="header-title">Subreddit Post Analyzer</h1>
          </div>
        </div>
      </header>
      
      <main className="app-content">
        <Sidebar />
        <section className="hero-section">
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
