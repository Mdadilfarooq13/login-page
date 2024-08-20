import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Header from "./components/header.js"
import Login from "./pages/login.js";
import Test from "./pages/test.js";

function App() {
  return (
    <Router>
        <Header />
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/test" element={<Test />} />
        </Routes>
    </Router>
  );
}

export default App;