import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CollageArea from './pages/CollageArea'
import Posting from './pages/Posting'

export default function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/collage" element={<CollageArea />} />
      <Route path="/posting" element={<Posting />} />
{/*  //     <Route path="/post/:id" element={<Post />} /> */}
    </Routes>
  )
}

