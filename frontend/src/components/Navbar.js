import React from 'react';
import { Link } from 'react-router-dom'
import cow from './cow.png'
import { BsFillPersonFill } from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";
import { LuClipboardList } from "react-icons/lu";
const Navbar = ({show}) => {
    return (
        <div className={show ? 'sidenav active' : 'sidenav'}>
            <h2><img src={cow} alt='Cow' className='cow'/> P'Daily</h2>
            <ul>
                <li>
                    <Link to="/"><BiHomeAlt/> Home</Link>
                </li>
                <li>
                    <Link to='/Board'><LuClipboardList/> Board</Link>
                </li>
                <li>
                    <Link to='/User'><BsFillPersonFill/> User</Link>
                </li>
            </ul>
        </div>
    )
}
export default Navbar