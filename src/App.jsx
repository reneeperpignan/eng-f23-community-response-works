import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/signIn';
import Landing from './components/landing';
import DataDashboard from './components/dataDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/dataDashboard" element={<DataDashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
