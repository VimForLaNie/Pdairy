import React from 'react';
import { Link } from 'react-router-dom';
import cow from './cow.png';
import { BiHomeAlt } from "react-icons/bi";
import { LuClipboardList } from "react-icons/lu";

const Navbar = ({ show }) => {
    return (
        <div className={show ? 'sidenav active' : 'sidenav'}>
            <h2><img src={cow} alt='Cow' className='cow'/> P'Daily</h2>
            <ul>
                <li>
                    <Link to="/User"><BiHomeAlt/> My-Profile</Link>
                </li>
                <li>
                    <Link to='/Board'><LuClipboardList/> Board</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;
