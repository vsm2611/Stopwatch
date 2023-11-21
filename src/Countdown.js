import React, { useState, useEffect } from "react";
import "./Stopwatch.css";

const Countdown = () => {
  const [time, setTime] = useState(3000);
  const [isRunning, setIsRunning] = useState(false);
  const [defaultTime] = useState(time);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            setIsRunning(false);  // Stop the program when time reaches 0
            // setIsRunning(defaultTime); 
            clearInterval(intervalId);
            setTime(defaultTime); 
          }
          return prevTime - 1;
        });
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, defaultTime]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(defaultTime);
  };

  return (
    <div className="stopwatch-container">
      <p className="stopwatch-time">
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>

      <div className="stopwatch-buttons">
        <button className="stopwatch-button" onClick={startAndStop}>
          {isRunning ? "Stop" : "Start"}
        </button>

        <button className="stopwatch-button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Countdown;
