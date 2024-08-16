// src/components/PostList.js
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import PostCard from './PostCard';
import './styles/PostList.css';

const PostList = () => {
    const postsFromRedux = useSelector(state => state.posts.posts);
    const status = useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error);

    const [sortOrder, setSortOrder] = useState('asc');

    const sortedPosts = useMemo(() => {
        const posts = postsFromRedux.length > 0 ? postsFromRedux : [
            { id: 1, title: 'Introduction to React Hooks', summary: 'Learn the basics of React Hooks...', date: '2024-08-01' },
            { id: 2, title: 'Understanding Redux Toolkit', summary: 'Redux Toolkit can simplify your Redux logic...', date: '2024-07-15' },
            { id: 3, title: 'Exploring GraphQL', summary: 'Why use GraphQL over REST?', date: '2024-07-20' },
        ];

        return posts.slice().sort((a, b) => {
            if (sortOrder === 'asc') {
                return new Date(a.date) > new Date(b.date) ? 1 : -1;
            } else {
                return new Date(a.date) < new Date(b.date) ? 1 : -1;
            }
        });
    }, [postsFromRedux, sortOrder]);

    // Render loading and error states based on Redux status
    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="post-list-container">
            <button
                className='post-list-sort-button'
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
                Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
            </button>
            {sortedPosts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostList;