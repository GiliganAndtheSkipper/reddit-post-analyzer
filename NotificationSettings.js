import React, { useState } from "react";
import axios from "axios";

function NotificationSettings() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubscribe = async () => {
        if (!/\S+@\S+\.\S+/.test(email)) {
            setMessage('Please enter a valid email address.');
            return;
        }
        
        try {
            const response = await axios.post('/api/subscribe', { email });
            if (response.data.success) {
                setMessage('Subscription successful!');
            } else {
                setMessage('Subscription failed. Please try again.');
            }
        } catch (error) {
            console.error('Subscription error', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
            />
            <button onClick={handleSubscribe} disabled={!email || !/\S+@\S+\.\S+/.test(email)}>
                Subscribe to Alerts
            </button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default NotificationSettings;