import React, { useState, useEffect } from "react";
import "./App.css";
import { decodeChapters, encodedChapters, ChapterList } from "./ChapterList";
import StartedView from "./Started";
import AssistantView from "./Assistant";
import RequestView from "./RequestView";
import ReadView from "./ReadView";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const basename = "/my-story";


const ShareButton = ({chapters}) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const handleCopy = async () => {
      try {
          if (!chapters) {
              setError('Please enter a title.');
              return;
          }
          setError('')

          const eChapters = encodedChapters(chapters);
          const params = new URLSearchParams();
          params.set('chapters', eChapters);
          const requestURL = `${window.location.origin}/my-story/read?${params.toString()}`;
          //navigate({ pathname: '/started', search: `?${params.toString()}` });
          // Copy text to clipboard
          await navigator.clipboard.writeText(requestURL);

          // Show the green success message
          setMessage('Link copied to clipboard!');
          
          // Hide the message after 1 second
          setTimeout(() => {
              setMessage('');
          }, 1000);
          setTimeout(() => {
            setError('');
        }, 1000);
      } catch (error) {
          console.error('Failed to copy text:', error);
      }
  };

  return (
      <div>
          {!message && !error &&<button className="share-button" onClick={() => handleCopy(chapters)}>Share</button>}
          {message && <p style={{ color: 'green' }}>{message}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
  );
};


function App() {
  const params = new URLSearchParams(window.location.search);

  const [chapters, setChapters] = useState([]);
  const [editIndex, setEditIndex] = useState(
    params.get("editIndex") !== null ? Number(params.get("editIndex")) : null
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedChapters = params.get("chapters");
    if (encodedChapters) {
      const dChapters = decodeChapters(encodedChapters);
      setChapters(dChapters);
    }
  }, []);

  useEffect(() => {
    console.log("on change index", editIndex);
    const findChapterByIndex = (index) => {
      if (index >= 0 && index < chapters.length) {
        const chapter = chapters[index];
        console.log("Chapter found:", chapter);
        return chapter;
      } else {
        console.log("Invalid index");
        return null;
      }
    };

    const foundChapter = findChapterByIndex(editIndex);
    if (foundChapter) {
      console.log("Set edit chapter");
      setTitle(foundChapter.title);
      setDescription(foundChapter.description);
    }
  }, [editIndex, chapters, setTitle, setDescription]);

  return (
    <div className="App">
      <header className="App-header">
        <Router basename={basename}>
          <Routes>
            <Route path="/" element={<StartedView />} />
            <Route
              path="/started"
              element={
                <div className="started-container">
                  <div className="chapter-list-view">
                    <ChapterList
                      chapters={chapters}
                      title={title}
                      description={description}
                      setChapters={setChapters}
                      setTitle={setTitle}
                      setDescription={setDescription}
                      editIndex={editIndex}
                      setEditIndex={setEditIndex}
                    />
                    <div className="share-button-container"> <ShareButton chapters={chapters}></ShareButton> </div>
                  </div>
                  
                  <div className="assistant-view">
                    <AssistantView title={title} description={description} />
                  </div>
                  
                </div>
              }
            />
            <Route path="/request" element={<RequestView/>} />
            <Route
              path="/assistant"
              element={
                <AssistantView title={title} description={description} />
              }
            />
            <Route
              path="/read"
              element={
                <div className="started-container">
                  <div className="chapter-list-view">
                    <ReadView chapters={chapters}></ReadView>
                  </div>
                </div>
              }
            />
            <Route path="/request" element={<RequestView />} />
            <Route
              path="/assistant"
              element={
                <AssistantView title={title} description={description} />
              }
            />
            <Route
              path="/chapter"
              element={
                <ChapterList
                  chapters={chapters}
                  title={title}
                  description={description}
                  setChapters={setChapters}
                  setTitle={setTitle}
                  setDescription={setDescription}
                />
              }
            />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
