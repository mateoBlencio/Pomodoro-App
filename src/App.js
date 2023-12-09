import { useEffect, useState } from "react";
import "./App.css";
import useSound from "use-sound";
import ring from "./ringtones/ringtone.mp4";

function App() {
  const [start, setStart] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [brake, setBrake] = useState(false);
  const [playRing] = useSound(ring);

  useEffect(() => {
    document.title = "Pomodoro-App";
  }, []);

  var timer;
  useEffect(() => {
    if (start === true) {
      timer = setInterval(() => {
        setSeconds(seconds - 1);

        if (seconds === 0) {
          setSeconds(59);
          setMinutes(minutes - 1);

          if (minutes === 0 && brake === false) {
            playRing();
            setBrake(true);
            setMinutes(25);
            setSeconds(0);
          }

          if (minutes === 0 && brake === true) {
            playRing();
            setBrake(false);
            setMinutes(25);
            setSeconds(0);
          }
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  });

  const startFunction = () => {
    setStart(true);
  };

  const restartFunction = () => {
    setMinutes(25);
    setSeconds(0);
    setStart(false);
  };

  const stopFunction = () => {
    setStart(false);
  };

  return (
    <div className="App">
      <body className="App-header">
        <h2>
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </h2>
      </body>
      <footer className="App-footer">
        {start === false ? (
          <button className="btn" onClick={startFunction}>
            Start
          </button>
        ) : (
          <button className="btn" onClick={stopFunction}>
            Stop
          </button>
        )}
        <button className="btn" onClick={restartFunction}>
          Restart
        </button>
      </footer>
    </div>
  );
}

export default App;
