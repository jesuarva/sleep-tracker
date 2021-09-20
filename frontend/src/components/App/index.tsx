import React from "react";
import logo from "../../logo.svg";
import classes from "./App.module.css";

console.log("\x1b[45mJSAV\x1b[0m classes  ", classes);
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

// validate: {
//   validator: (val) =>
//     /(^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$)/.test(val),
//   message: `Date must be in format: YYYY-MM-DD`,
// },
