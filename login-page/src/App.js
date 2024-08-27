import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.js";
import InputData from "./pages/input_data.js"
import EditableTable from "./pages/editable_table.js"
import Charts from "./pages/charts.js"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/input_data" element={<InputData />} />
        <Route path="/editable_table" element={<EditableTable />} />
        <Route path="charts" element={<Charts />} />
      </Routes>
    </Router>
  );
}

export default App;
