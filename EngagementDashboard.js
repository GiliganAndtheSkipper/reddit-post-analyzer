import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEngagement } from '../redux/slices/engagementSlice';
import './styles/EngagementDashboard.css';

const EngagementDashboard = () => {
    const { data, loading, error } = useSelector((state) => state.engagement);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEngagement());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>User Engagement</h2>
            <div>Active Users: {data?.activeUsers}</div>
            <ul>
                {data?.topContributors.map(user => (
                    <li key={user.username}>{user.username}: {user.posts} posts</li>
                ))}
            </ul>
        </div>
    );
};

export default EngagementDashboard;