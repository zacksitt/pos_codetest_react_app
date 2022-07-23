import React,{useRef,useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'


export default class App extends React.Component {

  render() {
  
    return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
       
      </Routes>
    </BrowserRouter>
    );
  }

}
