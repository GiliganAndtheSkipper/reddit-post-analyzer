import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../components/styles/WidgetA.css';

function WidgetA() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('https://api.example.com/data');
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <div className='widget'>Loading...</div>;
    if (error) return <div className='widget'>Error: {error}</div>;

    return (
        <div className="widget">
            <h1>Widget A</h1>
            <p>{data ? `Data: ${data.info}` : 'No data available'}</p>
        </div>
    );
}

export default WidgetA;