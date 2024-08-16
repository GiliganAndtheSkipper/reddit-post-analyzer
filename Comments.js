import React, { useEffect, useState } from "react";
import axios from "axios";
import Sentiment from 'sentiment';
import './styles/Comments.css';
const sentiment = new Sentiment();

const Comments = ({ subreddit, postId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`);
                const commentsData = response.data[1].data.children.map(child => child.data);
                const sortedComments = commentsData.sort((a, b) => b.ups - a.ups);

                const commentsWithSentiment = sortedComments.map(comment => ({
                    ...comment,
                    sentiment: sentiment.analyze(comment.body).score
                }));
                setComments(commentsWithSentiment);
                setError(null);
            } catch (err) {
                setError('Failed to load comments');
                console.error('Error fetching comments:', err);
            }
            setLoading(false);
        };

        fetchComments();
    }, [subreddit, postId]);

    if (loading) return <div>Loading comments...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="comments-container">
            <h3>Top Comments</h3>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        <p>{comment.body}</p>
                        <p>Upvotes: {comment.ups}</p>
                        <p>Sentiment: {comment.sentiment}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Comments;