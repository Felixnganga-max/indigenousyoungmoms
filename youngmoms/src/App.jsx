import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import React from "react";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Mission from "./pages/Mission";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/missions" element={<Mission />} />

        <Route path="/projects" element={<Programs />} />
        <Route path="/programs" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
