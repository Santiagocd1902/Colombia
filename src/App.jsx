import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './paginas/home'
import Detalles from './paginas/detalle'
import Favoritos from './paginas/favoritos'
import Informativa from './paginas/informativa'
import Original from './paginas/original'


function App() {

  return (
    <>
    <Router>

        <nav className="c-menu">
          <Link to="/">Home</Link>
          <Link to="/informativa">Informativa</Link>
          <Link to="/detalle">Detalle</Link>
          <Link to="/original">Original</Link>
          <Link to="/favoritos">Favoritos</Link>
        </nav>


      <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/informativa" element={<Informativa /> } />
          <Route path="/original" element={<Original /> } />
          <Route path="/favoritos" element={<Favoritos /> } />
          <Route path="/detalle/:depto/:municipio" element={<Detalles /> } />
      </Routes>
    </Router>
    </>
  )
}

export default App
