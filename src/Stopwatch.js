import React, { useState, useEffect } from "react";
import "./Stopwatch.css";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [lapTimes, setLapTimes] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime((prevTime) => prevTime + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  const addLapTime = () => {
    setLapTimes((prevLapTimes) => [...prevLapTimes, time]);
  };

  const formatTime = (lap) => {
    const hours = Math.floor(lap / 360000).toString().padStart(2, "0");
    const minutes = Math.floor((lap % 360000) / 6000).toString().padStart(2, "0");
    const seconds = Math.floor((lap % 6000) / 100).toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  const reset = () => {
    setTime(0);
    setLapTimes([]);
  };

  return (
    <div className="stopwatch-container">
      <p className="stopwatch-time">
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>
      <div className="stopwatch-laps">
        {lapTimes.map((lap, index) => (
          <div key={index} className="lap">
            {formatTime(lap)}
          </div>
        ))}
      </div>
      <div className="stopwatch-buttons">
        <button className="stopwatch-button" onClick={startAndStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="stopwatch-button" onClick={addLapTime}>
          Time Lap
        </button>
        <button className="stopwatch-button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;

// import React, { useState, useRef } from "react";
// import "./Stopwatch.css";

// const Stopwatch = () => {
//   const [isRunning, setIsRunning] = useState(false);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const intervalRef = useRef(null);

//   const startTimer = () => {
//     if (!isRunning) {
//       setIsRunning(true);
//       intervalRef.current = setInterval(() => {
//         setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
//       }, 1000);
//     }
//   };

//   const pauseTimer = () => {
//     if (isRunning) {
//       setIsRunning(false);
//       clearInterval(intervalRef.current);
//     }
//   };

//   const resetTimer = () => {
//     setIsRunning(false);
//     clearInterval(intervalRef.current);
//     setElapsedTime(0);
//   };

//   const formatTime = (time) => {
//     const hours = Math.floor(time / 3600).toString().padStart(2, "0");
//     const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, "0");
//     const seconds = (time % 60).toString().padStart(2, "0");
//     return `${hours}:${minutes}:${seconds}`;
//   };

//   return (
//     <div className="stopwatch-container">
//       <h1>Stopwatch App</h1>
//       <p className="elapsed-time">{formatTime(elapsedTime)}</p>
//       <div className="stopwatch-buttons">
//         {!isRunning ? (
//           <button className="stopwatch-button" onClick={startTimer}>
//             Start
//           </button>
//         ) : (
//           <button className="stopwatch-button" onClick={pauseTimer}>
//             Pause
//           </button>
//         )}
//         <button className="stopwatch-button" onClick={resetTimer}>
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Stopwatch;

