import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import './RequestView.css'
import {encodedChapters} from './ChapterList';

const RequestView = () => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    return (
        <div>
            <h2>Enter Your Story Title</h2>
            <input
                className='share-input'
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title here"
            />
            {error && <p style={{color: 'red'}}>{error}</p>}
            <CopyShareButton text={title} setError={setError} />
        </div>
    );
};

const CopyShareButton = ({text, setError}) => {
    const [message, setMessage] = useState('');

    const handleCopy = async () => {
        try {
            if (!text) {
                setError('Please enter a title.');
                return;
            }
            setError('')
            console.log(text)
            const eChapters = encodedChapters([{title: text}]);
            const params = new URLSearchParams();
            params.set('chapters', eChapters);
            const requestURL = `${window.location.origin}/my-story/started?${params.toString()}&editIndex=0`;
            //navigate({ pathname: '/started', search: `?${params.toString()}` });
            // Copy text to clipboard
            await navigator.clipboard.writeText(requestURL);

            // Show the green success message
            setMessage('Link copied to clipboard!');
            
            // Hide the message after 1 second
            setTimeout(() => {
                setMessage('');
            }, 1000);
        } catch (error) {
            console.error('Failed to copy text:', error);
        }
    };

    return (
        <div>
            <button className="share-button" onClick={() => handleCopy(text)}>Copy Link</button>
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
    );
};


export default RequestView;
