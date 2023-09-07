import './Appunion.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { GiHamburgerMenu } from "react-icons/gi";
import { BsBellFill , BsChatDots } from "react-icons/bs";
import Homeunion from './page/Homeunion';
import User from './page/User';
import Board from './page/Board';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Stack from '@mui/material/Stack';


function Appunion() {
  const [showNav, setShowNav] = useState(false);
  
  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <div className="App">
      <Router>
        <header>
          <GiHamburgerMenu onClick={toggleNav} style={{ cursor: "pointer"}}/>
          <div className='goright'></div>
          <Stack direction="row" spacing={2}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <BsBellFill size={20} style={{ margin: '10px' }} />
            <BsChatDots size={20} style={{ margin: '10px' }} />
          </div>
          </Stack>
        </header>
        <Navbar show={showNav} />
        <div className='main'>
          <Routes>
            <Route path="/" element={<User />} />
            <Route path="/user" element={<User />} />
            <Route path="/homeunion" element={<Homeunion />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default Appunion;