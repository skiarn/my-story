import React, { useState, useEffect } from "react";
import "./Started.css";
import logo from "./logo.svg";
import { useNavigate } from "react-router-dom";

// const AppLink = () => {
//   const navigate = useNavigate();
//   const handleShareMyStoryClick = () => {
//     navigate('/');
//   };
//   return (
//     <div>
//       {" "}
//       <button className="App-link" onClick={handleShareMyStoryClick}>
//         {" "}
//         Share My Story{" "}
//       </button>{" "}
//     </div>
//   );
// };

const StartedView = () => {
  const initialMessage =
    "By writing down these cherished memories and lessons, ensure that the essence of our life experiences is not lost to time. It’s about sharing a journey, celebrate achievements, and learn from challenges. I am on a mission to gather the collective wisdom and cherished experiences of my beloved family members. In our fast-paced world, it's easy to lose touch with the stories and lessons that shape who we are. This webpage aims to bridge that gap, providing a space for heartfelt questions and thoughtful answers.";
  const [displayedMessage, setDisplayedMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedMessage(initialMessage.substring(0, index + 1));
      index++;
      if (index === initialMessage.length) {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />

      <p className="initial-message">{displayedMessage}</p>
      {displayedMessage === initialMessage && (
        <p>
          It's time to share your story with the world or take the opporunity to send a family member or a friend a question.
        </p>
      )}

      {displayedMessage === initialMessage && (
        <div>
          <p>
            
          </p>{" "}
          <h2>How It Works</h2>{" "}
          <ol>
            {" "}
            <li>
              <strong>Submit Your Questions:</strong> Easily send questions to
              family members through our intuitive interface.
            </li>{" "}
            <li>
              <strong>Share Your Stories:</strong> Family members can respond
              with their wisdom, experiences, and advice.
            </li>{" "}
            <li>
              <strong>Experimental Project:</strong> We provide no guarantees and take no responsibility for loss, damage, or unexpected outcomes.
            </li>{" "}
          </ol>{" "}
          <h2>Join Us</h2>{" "}
        </div>
      )}

      {displayedMessage === initialMessage && (
        <button
          className="continue-button"
          onClick={() => {
            navigate("/started");
          }}
        >
          Start writing
        </button>
      )}
      {
        <button
          className="request-button"
          onClick={() => {
            navigate("/request");
          }}
        >
          Ask a Question
        </button>
      }
    </>
  );
};

export default StartedView;
