import React, { useEffect, useState } from 'react';
import './RightSidebar.css';
import { urlencoded } from 'body-parser';

const RightSidebar = () => {
    const [topPosts, setTopPosts] = useState([]);
    const [loadingTopPosts, setLoadingTopPosts] = useState(false);

    useEffect(() => {
        setLoadingTopPosts(true);
        fetch('https://www.reddit.com/r/all/top.json?limit=5')
        .then((response) => response.json())
        .then((data) => {
            const posts = data.data.children.map((post) =>({
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

    return (
        <aside className='right-sidebar'>
            <div className='top-posts'>
                <h3>Top Posts</h3>
                {loadingTopPosts ? (
                    <p>Loading top posts...</p>
                ) : (
                  <ul>
                    {topPosts.map((post, index) => (
                        <li key={index}>
                            <a href={post.url} target='_blank' rel='noopener noreferrer'>
                                {post.title} - {post.subreddit}
                            </a>
                        </li>
                    ))}
                  </ul>
                )}
            </div>
        </aside>
    );
};

export default RightSidebar;