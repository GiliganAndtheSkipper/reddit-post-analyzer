// src/components/SubredditHealth.js
import { index } from 'd3';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubredditHealth } from '../redux/slices/subredditHealthSlice';
import '../styles/SubredditHealth.css';

const SubredditHealth = ({ subreddit }) => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.SubredditHealth);

    useEffect(() => {
        dispatch(fetchSubredditHealth(subreddit));
    }, [dispatch, subreddit]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='subreddit-health'>
            <h2>Subreddit Health Indicators</h2>
            {data.map((indicator, index) => (
                <div key={index} className={`indicator ${indicator.status}`}>
                    {indicator.name}: {indicator.value}
                </div>
            ))}
        </div>
    );
};

export default SubredditHealth;