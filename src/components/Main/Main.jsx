import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from '../Home'
import Contact from '../Contact'
const Main = () => {
  return (

    <main>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/Contact" element={<Contact/>} />
      </Routes>
    </main>

  )
};

export default Main;
