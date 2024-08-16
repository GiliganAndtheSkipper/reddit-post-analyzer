/* src/components/SubredditDataFetcher.js */

import React, { useEffect } from 'react';  
import { useSelector, useDispatch } from 'react-redux';  // Import hooks to interact with Redux store
import { fetchPosts } from '../redux/slices/postsSlice';  
// Defines a functional component that fetches and displays subreddit data
const SubredditDataFetcher = ({ subreddit }) => {
    const dispatch = useDispatch();  // Gets the dispatch function to dispatch actions

    // Gets the posts, loading, and error state from the Redux store's posts slice
    const { posts, loading, error } = useSelector((state) => state.posts);

    // useEffect hook to fetch posts whenever the subreddit prop changes
    useEffect(() => {
        dispatch(fetchPosts(subreddit));  // Dispatch fetchPosts action to load subreddit posts
    }, [subreddit, dispatch]);  // Dependencies array ensures this runs when subreddit or dispatch changes

    // Renders a loading message if posts are being fetched
    if (loading) return <p>Loading...</p>;

    // Renders an error message if there was an error fetching posts
    if (error) return <p>Error: {error}</p>;

    // Renders the list of posts if available, otherwise indicate no posts are available
    return (
        <div>
            <h2>Posts in r/{subreddit}</h2>  // Display the subreddit name
            {posts.length > 0 ? (  // Check if there are posts to display
                <ul>
                    {posts.map(post => (  // Map over posts to create list items
                        <li key={post.id}> {/* Each list item needs a unique key, using post.id */}
                            <a href={`https://reddit.com${post.permalink}`} target='_blank' rel='noopener noreferrer'>
                                {post.title}  // Display the post title as a clickable link
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts available</p>  // Show message if there are no posts
            )}
        </div>
    );
};

export default SubredditDataFetcher; 