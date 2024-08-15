import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UrlShortnerForm from './forms/UrlShortnerForm';


function App() {
  return (
    <div>
      <BrowserRouter>
       <Routes> 
       <Route path="/" element={<UrlShortnerForm/>} />
       </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
