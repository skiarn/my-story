import React, { useState, useEffect } from "react";
import "./App.css";
import { decodeChapters, ChapterList } from "./ChapterList";
import StartedView from "./Started";
import AssistantView from "./Assistant";
import RequestView from "./RequestView";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const basename = '/my-story'
function App() {
  const [chapters, setChapters] = useState([]);
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
                    />
                  </div>
                  <div className="assistant-view">
                    <AssistantView title={title} description={description} />
                  </div>
                </div>
              }
            />
            <Route 
              path="/request"
              element={
                <RequestView/>
              }/>
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
