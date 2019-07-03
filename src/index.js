import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Main from "./main.js";

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
