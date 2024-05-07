import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Demo from "./pages/Demo";
//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Demo />}>
          <Route index element={<Demo />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
