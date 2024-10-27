import React, { useState } from 'react';
import Chapter from './Chapter';
import './ChapterList.css'

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

  const addChapter = () => {
    const newChapters = [...chapters, { title, description }];
    setChapters(newChapters);
    setTitle('');
    setDescription('');

    // Encode chapters as JSON string in base64 format and update URL parameters
    const eChapters = encodedChapters(newChapters);
    const params = new URLSearchParams();
    params.set('chapters', eChapters);
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const editChapter = (index, title, description) => {
    setEditIndex(index);
    setTitle(title);
    setDescription(description);
  };

  const updateChapter = () => {
    const updatedChapters = chapters.map((chapter, index) =>
      index === editIndex ? { title, description } : chapter
    );
    setChapters(updatedChapters);

    // Encode chapters as JSON string in base64 format and update URL parameters
    const eChapters = encodedChapters(updatedChapters);
    const params = new URLSearchParams();
    params.set('chapters', eChapters);
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);

    // Clear input fields and reset edit index
    setTitle('');
    setDescription('');
    setEditIndex(null);
  };

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