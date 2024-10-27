import React, { useState, useEffect } from 'react';
import './Started.css';
import logo from './logo.svg';

const StartedView =  ({ onContinue }) => {
    const initialMessage = 'By writing down these cherished memories and lessons, ensure that the essence of our life experiences is not lost to time. It’s a way to honor the journey, celebrate achievements, and learn from challenges. This written record will serve as a beacon of guidance, offering comfort and wisdom to those who come after us.';
    const [displayedMessage, setDisplayedMessage] = useState('');


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
    {displayedMessage === initialMessage && (<p>
        It's time to share your story with the world. I want to know the story of a person by presenting questions.
    </p>)}

    {displayedMessage === initialMessage && (<button className="continue-button" onClick={onContinue}>Continue</button>)}
    </>
  )
}

export default StartedView;