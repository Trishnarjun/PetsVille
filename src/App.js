import React, { Component } from 'react';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"
import Conversation from "./pages/conversation";
import { BrowserRouter, Routes, Route } from 'react-router-dom' // to help us route the pages

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/Register" element={<Register/>}/>
    <Route path="/Home" element={<Home/>}/>
    <Route path="/Conversation" element={<Conversation/>}/>    
    </Routes>
    </BrowserRouter>
  );
}

export default App;
