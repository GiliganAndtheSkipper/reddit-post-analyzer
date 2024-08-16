/* src/components/auth/LoginComponent.js */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubredditData } from '../../redux/slices/subredditSlice';
import '../styles/Subreddit.css';
import '../styles/LoginComponent.css';

// Defines a functional component named SubredditComponent
const SubredditComponent = () => {
    // Initializes Redux dispatch function to call actions
    const dispatch = useDispatch();
    // Retrieves posts, loading, and error state from Redux store
    const { posts, loading, error } = useSelector(state => state.subreddit);

    // useEffect to dispatch fetchSubredditData on component mount
    useEffect(() => {
        dispatch(fetchSubredditData('reactjs'));
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Maps through posts and renders each as a separate div if posts are available
    return (
        <div>
            {posts.map(post => (
                <div key={post.id} className='subreddit-post'>
                    <h3>{post.title}</h3>
                </div>
            ))}
        </div>
    );
};

export default SubredditComponent;
