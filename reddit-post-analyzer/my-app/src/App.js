import logo from './logo.svg';
import './App.css';
import SubredditSearch from './components/SubredditSearch.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <div>
        <h2>Search for Subreddits</h2>
        <SubredditSearch />
      </div>
    </div>
  );
}

export default App;
