import React, { useState, useEffect } from "react";
import "./App.css";
import { decodeChapters, ChapterList } from "./ChapterList";
import StartedView from "./Started";
import AssistantView from "./Assistant";
import RequestView from "./RequestView";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const basename = "/my-story";
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
                  </div>
                  <div className="assistant-view">
                    <AssistantView title={title} description={description} />
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
