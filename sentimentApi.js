// src/api/sentimentApi.js
import axios from 'axios';

// fetchSentimentAnalysis Asynchronously fetches sentiment analysis data for a specific subreddit.
export const fetchSentimentAnalysis = async (subreddit) => {
    try {
        // Makes an HTTP GET request to a predefined API URL, replacing 'your-api-url.com' with the actual API provider's URL.
        const response = await axios.get(`https://your-api-url.com/sentiment/${subreddit}`);
        // If the request is successful, the response from the API is returned.
        return response;
    } catch (error) {
        // If the request fails, the error is thrown to be handled by the caller.
        throw error;
    }
};

/* export default sentimentApi; */
