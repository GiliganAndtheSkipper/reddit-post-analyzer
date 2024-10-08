import React, { useEffect, useState } from 'react';
import './Sidebar.css';

// State to hold the top Reddit posts, categories, and subreddit posts
const Sidebar = ({ onCategorySelected }) => {
  const [topPosts, setTopPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subredditPosts, setSubredditPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingTopPosts, setLoadingTopPosts] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  // Fetch top posts from Reddit
  useEffect(() => {
    setLoadingTopPosts(true);
    fetch('https://www.reddit.com/r/all/top.json?limit=5')
      .then((response) => response.json())
      .then((data) => {
        const posts = data.data.children.map((post) => ({
          title: post.data.title,
          url: post.data.url,
          subreddit: post.data.subreddit,
        }));
        setTopPosts(posts);
        setLoadingTopPosts(false);
      })
      .catch((error) => {
        console.error('Error fetching top posts:', error);
        setLoadingTopPosts(false);
      });
  }, []);

  // Static subreddit categories with subreddit mapping
  useEffect(() => {
    const availableCategories = [
      { name: 'Music', icon: 'fas fa-music', subreddit: 'Music' },
      { name: 'Science', icon: 'fas fa-flask', subreddit: 'science' },
      { name: 'Gaming', icon: 'fas fa-gamepad', subreddit: 'gaming' },
      { name: 'News', icon: 'fas fa-newspaper', subreddit: 'news' },
      { name: 'Sports', icon: 'fas fa-football-ball', subreddit: 'sports' },
      { name: 'Spooky', icon: 'fas fa-ghost', subreddit: 'creepy' },
      { name: 'Technology', icon: 'fas fa-laptop-code', subreddit: 'technology' },
      { name: 'Movies', icon: 'fas fa-film', subreddit: 'movies' },
      { name: 'Books', icon: 'fas fa-book', subreddit: 'books' },
      { name: 'Art', icon: 'fas fa-paint-brush', subreddit: 'art' },
      { name: 'Travel', icon: 'fas fa-plane', subreddit: 'travel' },
      { name: 'Fitness', icon: 'fas fa-dumbbell', subreddit: 'fitness' },
      { name: 'Food', icon: 'fas fa-utensils', subreddit: 'food' },
    ];
    setCategories(availableCategories);
  }, []);

  // Handle category click to fetch posts from a subreddit
  const handleCategoryClick = (subreddit) => {
    setLoading(true);
    fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=5`)
      .then((response) => response.json())
      .then((data) => {
        const subredditPosts = data.data.children.map((post) => ({
          title: post.data.title,
          url: post.data.url,
        }));
        setSubredditPosts(subredditPosts);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching subreddit posts:', error);
        setLoading(false);
      });
    if (onCategorySelected) {
      onCategorySelected(subreddit);
    }
  };

  return (
    <aside className="sidebar">
      {/* Instructional Text */}
      <h4 className='instruction-text'>Click a category to explore top posts</h4>
      
      {/* Top Posts Section */}
      <div className="top-posts">
        <h3>Top Posts</h3>
        {loadingTopPosts ? (
          <p>Loading top posts...</p>
        ) : (
          <ul>
            {topPosts.slice(0, 5).map((post, index) => (
              <li key={index}>
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  {post.title} - {post.subreddit}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Subreddit Categories Section */}
      <div className="categories">
        <h3>Subreddit Categories</h3>
        <ul>
          {categories.slice(0, showMoreCategories ? categories.length : 3).map((category) => (
            <li key={category.name} onClick={() => handleCategoryClick(category.subreddit)}>
              <button className='category-button'>
                <i className={category.icon}></i> {category.name}
              </button>
            </li>
          ))}
        </ul>
        {categories.length > 3 && (
          <button className='show-more-button' onClick={() => setShowMoreCategories(!showMoreCategories)}>
            {showMoreCategories ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>

      {/* Subreddit Posts Section */}
      <div className="subreddit-posts">
        {loading ? (
          <p>Loading posts...</p>
        ) : (
          subredditPosts.length > 0 && (
            <>
              <h3>Subreddit Posts</h3>
              <ul>
                {subredditPosts.map((post, index) => (
                  <li key={index}>
                    <a href={post.url} target="_blank" rel="noopener noreferrer">
                      {post.title}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )
        )}
      </div>
    </aside>
  );
};

export default Sidebar;