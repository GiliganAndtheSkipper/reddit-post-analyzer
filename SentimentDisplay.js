/* src/components/SentimentDisplay.js */
import React, { useState, useEffect } from 'react';
import { fetchSentimentAnalysis } from './api/sentimentApi';

const SentimentDisplay = ({ subreddit }) => {
    const [sentiment, setSentiment] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchSentimentAnalysis(subreddit)
            .then(data => {
                setSentiment(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    },  [subreddit]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Sentiment Analysis</h1>
            <p>{sentiment ? JSON.stringify(sentiment) : 'No data available'}</p>
        </div>
    );
};

export default SentimentDisplay;