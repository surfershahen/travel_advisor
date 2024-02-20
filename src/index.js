// import React from "react";
// import { ReactDOM } from "react";
// import App from "./App";

// ReactDOM.render(<App />, document.getElementById("root"));

import React from "react";

import { createRoot } from "react-dom/client";

import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Router>
    <App />
  </Router>
);
