import React from 'react';
import './SingleChapter.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { encodedChapters } from "./ChapterList";

const SingleChapter = ({ title, setTitle, description, setDescription }) => {
  const navigate = useNavigate(); 
  const location = useLocation();
  

  return (
    <div className="single-chapter-container">
      <div className="single-chapter-content">
        <input
          type="text"
          value={title}
          onChange={(e) => {
              const eChapters = encodedChapters([{title: e.target.value, description: description}]);
          
              const params = new URLSearchParams(location.search);
              params.set('chapters', eChapters);
              params.set('editIndex', 0);
              navigate(`${location.pathname}?${params.toString()}`, { replace: true});
              setTitle(e.target.value)
            }
          }
          placeholder="Chapter Title"
          className="chapter-input"
        />
        <textarea
          value={description}
          onChange={(e) => {
              const eChapters = encodedChapters([{title: title, description: e.target.value}]);
          
              const params = new URLSearchParams(location.search);
              params.set('chapters', eChapters);
              navigate(`${location.pathname}?${params.toString()}`, { replace: true});
              setDescription(e.target.value)
            }
          }
          placeholder="Chapter Description"
          className="chapter-textarea"
        />
      </div>
    </div>
  );
};

export default SingleChapter;