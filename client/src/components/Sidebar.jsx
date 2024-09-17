import React, { useEffect, useState } from 'react';
import './Sidebar.css';
/*import { response } from 'express';*/

const Sidebar = () => {
  const [topPosts, setTopPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subredditPosts, setSubredditPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch top posts from Reddit
  useEffect(() => {
    fetch('https://www.reddit.com/r/all/top.json?limit=5')
      .then((response) => response.json())
      .then((data) => {
        const posts = data.data.children.map((post) => ({
          title: post.data.title,
          url: post.data.url,
          subreddit: post.data.subreddit,
        }));
        setTopPosts(posts);
      });
  }, []);

  // Static subreddit categories
  useEffect(() => {
    const availableCategories = [
      { name: 'Technology', icon: 'fas fa-laptop-code' },
      { name: 'Science', icon: 'fas fa-flask' },
      { name: 'Gaming', icon: 'fas fa-gamepad' },
      { name: 'News', icon: 'fas fa-newspaper' },
      { name: 'Sports', icon: 'fas fa-football-ball' },
    ];
    setCategories(availableCategories);
  }, []);

  const handleCategoryClick = (subredditName) => {
    setLoading(true);
    fetch(`https://www.reddit.com/r/${subredditName}/top.json?limit=5`)
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
  };

  return (
    <aside className="sidebar">
      {/* Navigation Links Section */}
      <div className="nav-links-sidebar">
        <nav className="sidebar-nav-links"> 
          <ul>
            <li>
              <a href="#">
                <i className="fas fa-home"></i> Home
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-fire"></i> Popular
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-compass"></i> Explore
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Top Posts Section */}
      <div className="top-posts">
        <h3>Top Posts</h3>
        <ul>
          {topPosts.map((post, index) => (
            <li key={index}>
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                {post.title} - {post.subreddit}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Subreddit Categories Section */}
      <div className="categories">
        <h3>Subreddit Categories</h3>
        <ul>
          {categories.map((category) => (
            <li key={category.name} onClick={() => handleCategoryClick(category.name)}>
               <a href="#" onClick={(e) => e.preventDefault()}>
                <i className={category.icon}></i> {category.name}
              </a>
            </li>
          ))}
        </ul>
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
                      <a href={post.url} target='_blank' rel='noopener noreferrer'>
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