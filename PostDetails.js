import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { Line } from 'react-chartjs-2'; // Imports the Line component from react-chartjs-2 for rendering line charts.
import './styles/PostDetails.css'; 

function PostDetails({ match }) { // Defines a functional component PostDetails that receives match prop from router.
    const [post, setPost] = useState({}); // State for storing post details.
    const [comments, setComments] = useState([]); // State for storing comments related to the post.
    const [graphData, setGraphData] = useState({}); // State for storing data needed for the graph.

    useEffect(() => { // React hook for side effects.
        async function fetchData() { // Declares an asynchronous function to fetch data.
            const postResponse = await axios.get(`https://www.reddit.com${match.url}.json`); // Fetches post and comments from Reddit.
            const postData = postResponse.data[0].data.children[0].data; // Extracts post data from the response.
            const commentsData = postResponse.data[1].data.children.map(child => child.data); // Extracts comments data.

            setPost(postData); // Updates post state with fetched post data.
            setComments(commentsData); // Updates comments state with fetched comments.

            // Setting up graph data for the chart
            setGraphData({
                labels: commentsData.map((_, i) => i + 1), // Creates labels for the chart.
                datasets: [{
                    label: 'Upvotes per Comment', // Label for the dataset.
                    data: commentsData.map(comment => comment.ups), // Data points extracted from each comment's upvotes.
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)', // Line color.
                    tension: 0.1 // Bezier curve tension.
                }]
            });
        }

        fetchData(); // Calls fetchData to execute fetching data.
    }, [match.url]); // Dependency array for useEffect, triggers when match.url changes.

    return (
        <div className="post-container"> // Container for the component.
            <h1 className="post-title">{post.title}</h1> // Displays the post's title.
            <p className="post-body">{post.selftext || "No additional text available."}</p> // Displays the post's body or a default message.
            <div className="post-metadata"> // Container for post metadata.
                <span className="author">{post.author}</span> | // Displays the author's name.
                <span className="date">{new Date(post.created_utc * 1000).toLocaleDateString()}</span> // Converts timestamp to date and displays it.
            </div>
            <Line data={graphData} /> // Renders the line chart with the graph data.
            <ul> // List for comments.
                {comments.map(comment => ( // Maps over comments array to render each comment.
                    <li key={comment.id}>{comment.body}</li> // Displays comment body.
                ))}
            </ul>
            <a href={`/comments/${post.id}`} className="comments-link"> // Link to view all comments.
                View Comments
            </a>
        </div>
    );
}

export default PostDetails; 