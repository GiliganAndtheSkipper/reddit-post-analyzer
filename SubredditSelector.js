import React, { useState } from 'react';

const SubredditSelector = ({ onChange }) => {
    const subreddits = ['reactjs', 'vuejs', 'angular', 'webdev', 'programming'];
    // Local state to manage the input or selected subreddit
    const [subreddit, setSubreddit] = useState('');
    
    // Handle dropdown selection or manual input
    const handleSelection = (event) => {
        setSubreddit(event.target.value);
        onChange(event.target.value);
    };

    // Function to handle form submission for manual input
    const handleSubmit = (event) => {
        event.preventDefault();
        if (onChange && subreddit) {
            onChange(subreddit);
        }
    };

    return (
        <div className="subreddit-selector">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="subreddit-select">Choose a subreddit:</label>
                    <select id="subreddit-select" value={subreddit} onChange={handleSelection}>
                        {subreddits.map(subreddit => (
                            <option key={subreddit} value={subreddit}>{subreddit}</option>
                        ))}
                        <option value="">Other (enter below)</option>
                    </select>
                    </div>
                    <div>
                    <input
                        type="text"
                        placeholder="Enter subreddit"
                        value={subreddit}
                        onChange={handleSelection}
                        disabled={subreddits.includes(subreddit)}
                    />
                </div>
                <button type="submit">Load Posts</button>
            </form>
        </div>
    );
};

export default SubredditSelector;
