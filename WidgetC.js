import React, { useState, useEffect } from "react";
import '../../components/styles/WidgetC.css';

const WidgetC = ({ totalPosts }) => {
    const [postsCount, setPostsCount] = useState(totalPosts);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        setPostsCount(totalPosts);
    }, [totalPosts]);

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setPostsCount(prevCount => prevCount + Math.floor(Math.random() * 10));
            setRefreshing(false);
        }, 1000);
    };

    return (
        <div className="widget-c">
            <h2>Post Statistics</h2>
            <p>Total Posts: {postsCount}</p>
            <button onClick={handleRefresh} disabled={refreshing}>
                {refreshing ? 'Refreshing...' : 'Refresh Data'}
            </button>
        </div>
    );
};

export default WidgetC;