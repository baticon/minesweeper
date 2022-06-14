import React from "react";
import "./App.css";
import Board from "../src/Components/Board";
import Header from "../src/Components/Header";
import mineLogo from "../src/media/mineLogo.png";
import backgroundVideo from "../src/media/minesweeping.mp4";

function App() {
  return (
    <div className="App">
      <img src={mineLogo} className="App-logo" alt="logo" />
      <Header />
      <div className="board">
        <Board />
      </div>
      <div className="video">
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "30%",
            left: "17%",
            top: "53%",
            height: "30%",
            objectFit: "cover",
            transform: "translate(-50%, -50%",
            zIndex: "-1",
          }}
        >
          <source src={backgroundVideo} type="video/mp4"></source>
        </video>
      </div>
    </div>
  );
}

export default App;
