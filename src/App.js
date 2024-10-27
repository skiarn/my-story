import React, { useState, useEffect } from 'react';
import './App.css';
import { decodeChapters, ChapterList } from './ChapterList';
import StartedView from './Started';
import AssistantView from './Assistant';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [chapters, setChapters] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedChapters = params.get('chapters');
    if (encodedChapters) {
      const dChapters = decodeChapters(encodedChapters)
      setChapters(dChapters);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <article>
          <a
            className="App-link"
            href="/share-my-story"
            target="_blank"
            rel="noopener noreferrer"
          >
            Share My Story
          </a>
        </article>
        <Router>
          <Routes>
            <Route path="/" element={<StartedView onContinue={() => {
              window.location.href = '/started';
            }} />} />
            <Route path="/started" element={
              <div className="started-container">
                <div className="chapter-list-view">

                  <ChapterList
                    chapters={chapters}
                    title={title}
                    description={description}
                    setChapters={setChapters}
                    setTitle={setTitle}
                    setDescription={setDescription}
                  />
                </div>
                <div className='assistant-view'>
                  <AssistantView title={title} description={description} />
                </div>
              </div>

            }></Route>
            <Route path="/assistant" element={<AssistantView title={title} description={description}></AssistantView>}></Route>
            <Route path="/chapter" element={
              <ChapterList
                chapters={chapters}
                title={title}
                description={description}
                setChapters={setChapters}
                setTitle={setTitle}
                setDescription={setDescription}
              />}></Route>
          </Routes>
        </Router>
      </header>
    </div>);
}

export default App;