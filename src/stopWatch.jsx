import React, { useState, useEffect, useRef } from "react";

function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsed;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsed(0);
    setIsRunning(false);
  }

  function formatTime() {
    const hrs = Math.floor(elapsed / (1000 * 60 * 60));
    const min = Math.floor((elapsed / (1000 * 60)) % 60);
    const sec = Math.floor((elapsed / 1000) % 60);
    const millsec = Math.floor((elapsed % 1000) / 10);

    return `${hrs < 10 ? "0" + hrs : hrs}:${
      min < 10 ? "0" + min : min
    }:${sec < 10 ? "0" + sec : sec}:${millsec < 10 ? "0" + millsec : millsec}`;
  }

  return (
    <div className="stopWatch">
      <div className="display">{formatTime()}</div>
      <div className="controls">
        <button onClick={start} className="startbtn">
          start
        </button>
        <button onClick={stop} className="stopbtn">
          stop
        </button>
        <button onClick={reset} className="resetbtn">
          reset
        </button>
      </div>
    </div>
  );
}

export default StopWatch;
