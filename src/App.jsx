import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Navbar from './component/navbar';
import Home from './pages/Home';
import Footer from './component/Footer';
import FormPendaftaran from './pages/FormPendaftaran';

import './App.css'

function App() {

  return (
    <>
    <Router>
      <Navbar/>
      <div className='mt-5'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/formpendaftaran' element={<FormPendaftaran/>} />
        </Routes>
      </div>
      <Footer/>
    </Router>
    </>
  )
}

export default App
