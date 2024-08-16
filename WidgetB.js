import React, { useEffect, useState } from "react";
import '../../components/styles/WidgetB.css';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const WidgetB = ({ subreddit }) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://www.reddit.com/r/${subreddit}/top.json?limit=5`);
                const posts = response.data.data.children;

                const labels = posts.map(post => post.data.title);
                const upvotes = posts.map(post => post.data.ups);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Upvotes',
                            data: upvotes,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        },
                    ],
                });

                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, [subreddit]);

    if (loading) return <div className="widget-b">Loading data...</div>;
    if (error) return <div className="widget-b">{error}</div>;

    return (
        <div className="widget-b">
            <h2>Top Posts in {subreddit}</h2>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            ticks: {
                                autoSkip: false,
                                maxRotation: 90,
                                minRotation: 45,
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default WidgetB;