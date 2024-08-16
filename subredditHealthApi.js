// src/api/subredditHealthApi.js
import axios from 'axios';

export const fetchHealthData = async (subreddit) => {
    return axios.get(`https://api.example.com/subreddit/${subreddit}/health`);
};
