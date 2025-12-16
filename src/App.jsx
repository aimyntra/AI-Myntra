import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import CourseDetail from './pages/CourseDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#050505] text-[#ededed] overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs/:slug" element={<CourseDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
