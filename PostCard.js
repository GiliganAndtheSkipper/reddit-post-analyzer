import React, { useState } from 'react';
import './styles/PostCard.css';

const PostCard = ({ post }) => {
    const [votes, setVotes] = useState(post.votes || 0);

    const handleVote = (increment) => {
        setVotes(votes + increment);
    };

    return (
        <div className='post-card'>
            <div className='post-card-header'>
                {post.image && <img src={post.image} alt={post.title} className='post-card-image' />}
                <h2 className='post-card-title'>{post.title}</h2>
            </div>
            <p className='post-card-body'>{post.summary}</p>
            <div className='post-card-info'>
                <span className='post-card-author'>{post.author}</span>
                <span className='post-card-date'>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
            <div className='post-card-footer'>
                <div className='post-card-votes'>
                    <button onClick={() => handleVote(1)}>Upvote</button>
                    <span>{votes}</span>
                    <button onClick={() => handleVote(-1)}>Downvote</button>
                </div>
                <button onClick={() => alert('Comment functionality to be implemented.')}>Comments ({post.commentsCount || 0})</button>
            </div>
        </div>
    );
};

export default PostCard;