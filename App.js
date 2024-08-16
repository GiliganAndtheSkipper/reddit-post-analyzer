import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SubredditSearch from './components/SubredditSearch';
import Dashboard from './components/Dashboard';
import PostDetails from './components/PostDetails';
import { AuthContext } from './contexts/AuthContext';
import LoginComponent from './components/auth/LoginComponent';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import PostList from './components/PostList';
import './App.css';
import './components/styles/theme.css';
import SubredditDataFetcher from './components/SubredditDataFetcher';
import NotFound from './components/NotFound'; 

const App = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return (
    <Router>
      <Header />
      <div className='App'>
        <Sidebar />
        <div className="container">
          <SubredditSearch />
          <PostList />
          <Routes>
            <Route path="/subreddit/:subredditName" element={<SubredditDataFetcher />} />
            {/* Protected Routes */}
            {user ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/posts/:postId" element={<PostDetails />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
            {/* Login Route */}
            <Route path='/login' element={<LoginComponent />} />
            {/* Fallback 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
