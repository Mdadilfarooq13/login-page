import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Login from "./pages/login.js";
import Input from "./pages/input.js";

function App() {
  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/input" element={<Input />} />
        </Routes>
    </Router>
  );
}

export default App;