import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { GiHamburgerMenu } from "react-icons/gi";
import Homefarmer from './page/Homefarmer';
import User from './User';
import Board from './page/Board';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  const [showNav, setShowNav] = useState(false);
  
  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <div className="App">
      <Router>
        <div style={{backgroundColor:"#024e9f" , textAlign:"center",height:"fit-content",fontSize:"28px",padding:"10px", fontWeight: 'bold'}}>P'dairy</div>
        <header>
          <GiHamburgerMenu onClick={toggleNav} style={{ cursor: "pointer" ,color:"#024e9f"}}/>
          <div className='goright'></div>
        </header>
        <Navbar show={showNav} />
        <div className='main'>
          <Routes>
            <Route path="/" element={<User />} />
            <Route path="/user" element={<User />} />
            <Route path="/board" element={<Board />} />
            <Route path="/homefarmer" element={<Homefarmer />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;