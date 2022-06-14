import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import backgroundAudio from "../src/media/background_music.mp3";
import duck from "../src/media/duck.mp3";

const audio2 = new Audio(duck);

const Sound = () => {
  const audio = new Audio(backgroundAudio);
  audio.loop = true;

  return (
    <div>
      <button
        onClick={() => {
          audio.loop = true;
          audio.play();
        }}
      >
        Play audio
      </button>
      <button
        onClick={() => {
          audio.loop = false;
          audio.pause();
        }}
      >
        Pause audio
      </button>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Sound />,
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
