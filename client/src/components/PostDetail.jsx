import React from 'react';
import './PostDetail.css';  

const PostDetail = ({ post, setSelectedPost }) => {
  if (!post) return null;

  return (
    <div className="post-detail">
      <button onClick={() => setSelectedPost(null)}>Back to results</button>
      <h2>{post.title}</h2>
      <p>{post.selftext || 'No content available'}</p>
      <a href={post.url} target="_blank" rel="noopener noreferrer">
        View on Reddit
      </a>
    </div>
  );
};

export default PostDetail;
