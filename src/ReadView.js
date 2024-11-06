import React from 'react';
import ReadChapter from './ReadChapter';
import './ReadView.css'

const ReadView = ({ chapters }) => {
  return (
    <div className="chapter-container">
      <div className="chapter-list">
      {chapters.map((chapter, index) => (
        <ReadChapter
          key={index}
          title={chapter.title}
          description={chapter.description}
        />
      ))}
      </div>
    </div>
  );
};

export default ReadView;