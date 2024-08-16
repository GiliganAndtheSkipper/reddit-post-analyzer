/* /src/api/apiService.js */
import axios from 'axios';

const BASE_URL = 'https://www.reddit.com/r';

const apiService = {
    fetchPosts: (subreddit) => {
        return axios.get(`${BASE_URL}/${subreddit}.json`)
        .then(response => response.data.data.children.map(child => child.data))
        .catch(error => console.error('Error fetching posts:', error));
    },
};

export default apiService;
