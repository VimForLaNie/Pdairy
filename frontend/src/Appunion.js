import './App.css';
import React, { useState } from 'react';
import Navbarunion from './components/Navbarunion';
import { GiHamburgerMenu } from "react-icons/gi";
import Homeunion from './page/Homeunion';
import User from './User';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function Appunion() {
  const [showNav, setShowNav] = useState(false);
  
  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <div className="Appunion">
      <Router>
        <div style={{backgroundColor:"#024e9f" , textAlign:"center",height:"fit-content",fontSize:"28px",padding:"10px", fontWeight: 'bold'}}>P'dairy</div>
        <header>
          <GiHamburgerMenu onClick={toggleNav} style={{ cursor: "pointer" ,color:"#024e9f"}}/>
          <div className='goright'></div>
        </header>
        <Navbarunion show={showNav} />
        <div className='main'>
          <Routes>
            <Route path="/" element={<User />} />
            <Route path="/user" element={<User />} />
            <Route path="/homeunion" element={<Homeunion />} />
            {/* <Route path="/appunion" element={<Appunion/>}/> */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default Appunion;