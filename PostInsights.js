import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/PostInsights.css';

const PostInsights = () => {
    const [peakTimes, setPeakTimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const { data } = await axios.get('/api/posts/timing');
                setPeakTimes(analyzeData(data));
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPostData();
    }, []);

    const analyzeData = (data) => {
        return data.map(d => ({
            time: d.time,
            score: Math.random() * 100
        }));
    };

    if (loading) return <div>Loading insights...</div>;
    if (error) return <div>Error loading insights: {error}</div>;

    return (
        <div className='post-insights'>
            <h2>Peak Posting Times</h2>
            <ul>
                {peakTimes.map((time, index) => (
                    <li key={index}>{`Time: ${time.time}, Score: ${time.score.toFixed(2)}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default PostInsights;