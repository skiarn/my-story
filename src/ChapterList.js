import React, { useEffect, useState } from 'react';
import Chapter from './Chapter';
import './ChapterList.css'
import { useNavigate, useLocation } from 'react-router-dom';

function encodedChapters(chapters) {
  const data = JSON.stringify(chapters); //pako.deflate(JSON.stringify(chapters), { to: 'string' });
  //console.log(pako.deflate(JSON.stringify({t: "test"}), { to: 'string' }));
  //console.log(pako.inflate(pako.deflate(JSON.stringify({t: "test"}), { to: 'string' }), { to: 'string' }));

  const encodedChapters = btoa(data);
  const urlsafeEncodedChapters = encodedChapters.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return urlsafeEncodedChapters;
}

function decodeChapters(encodedData) {
  const nonurlSafeData = encodedData.replace(/-/g, '+').replace(/_/g, '/');
  const data = atob(nonurlSafeData);
  //const jsonString = pako.inflate(data, { to: 'string' });
  const chapters = JSON.parse(data);
  return chapters;
}

const ChapterList = ({ chapters, setChapters, title, setTitle, description, setDescription }) => {
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate(); 
  const location = useLocation();


  const addChapter = () => {
    const newChapters = [...chapters, { title, description }];
    setChapters(newChapters);
    setTitle('');
    setDescription('');

    // Encode chapters as JSON string in base64 format and update URL parameters
    const eChapters = encodedChapters(newChapters);

    const params = new URLSearchParams(location.search);
    params.set('chapters', eChapters);
    params.delete('editIndex');
    navigate(`${location.pathname}?${params.toString()}`, { replace: true});
    //window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const editChapter = (index, title, description) => {
    setEditIndex(index);
    setTitle(title);
    setDescription(description);
    const params = new URLSearchParams(location.search);
    params.set('editIndex', index);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true});
  };

  const updateChapter = () => {
    const updatedChapters = chapters.map((chapter, index) =>
      index === editIndex ? { title, description } : chapter
    );
    setChapters(updatedChapters);

    // Encode chapters as JSON string in base64 format and update URL parameters
    const eChapters = encodedChapters(updatedChapters);
    const params = new URLSearchParams(location.search);
    params.set('chapters', eChapters);
    params.delete('editIndex');
    //window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true});
    // Clear input fields and reset edit index
    setTitle('');
    setDescription('');
    setEditIndex(null);
  };



  useEffect(() => { 
    const params = new URLSearchParams(location.search); 
    const value = params.get('editIndex'); 
    const findChapterByIndex = (index) => {
      if (index >= 0 && index < chapters.length) {
          const chapter = chapters[index];
          console.log('Chapter found:', chapter);
          return chapter;
      } else {
          console.log('Invalid index');
          return null;
      }
  };

    if (value) { 
      const foundChapter = findChapterByIndex(value);
      if(foundChapter && foundChapter.title !== title) {
        setEditIndex(value); 
        setTitle(foundChapter.title);
        setDescription(foundChapter.description);
      }
    } 
  }, [location.search, chapters, setTitle, setDescription, title]);


  return (
    <div className="chapter-container">
      <div className="add-chapter">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Chapter Title"
          className="chapter-input"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Chapter Description"
          className="chapter-textarea"
        />
        {editIndex !== null ? (
          <button onClick={updateChapter} className="add-chapter-button">Update Chapter</button>
        ) : (
          <button onClick={addChapter} className="add-chapter-button">Add Chapter</button>
        )}
      </div>
      <div className="chapter-list">

      {chapters.map((chapter, index) => (
        <Chapter
          key={index}
          title={chapter.title}
          description={chapter.description}
          onEdit={() => editChapter(index, chapter.title, chapter.description)}
        />
      ))}
      </div>
    </div>
  );
};

export {ChapterList, decodeChapters, encodedChapters};