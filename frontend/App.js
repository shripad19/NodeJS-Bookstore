import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/update" element={<UpdateProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
