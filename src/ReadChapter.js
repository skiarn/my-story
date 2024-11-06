import React, { useState } from 'react';
import './ReadChapter.css';

const ReadChapter = ({ title, description }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="chapter">
            <div className="chapter-header" onClick={toggleCollapse}>
                <h3>{title}</h3>
            </div>
            {!isCollapsed && <p className="chapter-description">{description}</p>}
        </div>
    );
};

export default ReadChapter;
