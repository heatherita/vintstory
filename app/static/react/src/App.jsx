import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CollageArea from './pages/CollageArea'
import Postings from './pages/Postings'

export default function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/collage" element={<CollageArea />} />
      <Route path="/postings" element={<Postings />} />
{/*  //     <Route path="/post/:id" element={<Post />} /> */}
    </Routes>
  )
}




/*
 * old App.jsx
import React from 'react';
import CollageArea from './components/CollageArea';

function App() {
  return (
    <div className="App">
      <CollageArea />
    </div>
  );
}

export default App;
*/
