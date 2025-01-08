import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Header from './pages/Header';
import Footer from './pages/Footer';
import LiveFeed from './pages/LiveFeed';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/live-feed" element={<LiveFeed />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;