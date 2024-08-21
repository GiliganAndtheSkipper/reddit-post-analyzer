import React, { useEffect, useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [topPosts, setTopPosts] = useState([]);
  const [categories, setCategories] = useState([]);

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

  // Static subreddit categories for now
  useEffect(() => {
    const availableCategories = [
      'Technology',
      'Science',
      'Gaming',
      'News',
      'Sports',
    ];
    setCategories(availableCategories);
  }, []);

  return (
    <aside className="sidebar">
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

      <div className="categories">
        <h3>Subreddit Categories</h3>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
