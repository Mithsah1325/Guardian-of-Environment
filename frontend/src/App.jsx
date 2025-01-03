import React from 'react'; 
import DragAndLearn from './pages/DragAndLearn.jsx';
import HomePage from './pages/HomePage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Plantify from './pages/Plantify.jsx';




function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/drag-and-learn" element={<DragAndLearn />} />
                <Route path="/identify-plant" element={<Plantify />} />
            </Routes>
      </Router>
  )
}

export default App
