import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Demo from "./pages/Demo";
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import Gaming from "./pages/Gaming/Gaming"
import Software from "./pages/Software/Software";
import Login from "./pages/Login/Login"
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
        <Route path="/Home" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/About" element={<About />}>
          <Route index element={<About />} />
        </Route>
        <Route path="/Gaming" element={<Gaming />}>
          <Route index element={<Gaming />} />
        </Route>
        <Route path="/Software" element={<Software />}>
          <Route index element={<Software />} />
        </Route>
        <Route path="/Login" element={<Login />}>
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
