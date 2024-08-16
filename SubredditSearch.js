// src/components/SubredditSearch.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../redux/reducers/postsReducer';
import './styles/SubredditSearch.css';

const SubredditSearch = () => {
    const [subreddit, setSubreddit] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (subreddit.trim() !== '') {
            // Fetch suggestions from the Datamuse API
            fetch(`https://api.datamuse.com/sug?s=${subreddit}`)
                .then(response => response.json())
                .then(data => setSuggestions(data.map(s => s.word)))
                .catch(error => console.error('Error fetching suggestions:', error));
        } else {
            setSuggestions([]);
        }
    }, [subreddit]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (subreddit.trim() === '') return;
        dispatch(fetchPosts(subreddit));
    };

    const handleSuggestionClick = (suggestion) => {
        setSubreddit(suggestion);
        setSuggestions([]);
        dispatch(fetchPosts(suggestion));
    };

    return (
        <div className="subreddit-search-container">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={subreddit}
                    onChange={(e) => setSubreddit(e.target.value)}
                    placeholder="Search for a subreddit"
                    list="subreddit-suggestions"
                />
                <button type="submit">Search</button>
                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </form>
        </div>
    );
};

export default SubredditSearch;