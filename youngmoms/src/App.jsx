import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import React from "react";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Programs />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
