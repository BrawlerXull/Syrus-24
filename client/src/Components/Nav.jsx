import React from 'react'
import "./Css/Nav.css"
import { Link } from 'react-router-dom'
import MetaMaskAuth from '../Metamask'

function Nav() {
  return (
    <div className='navbar'>
        <div className="nav-left">
            <Link to="/"  className='logo'>GenNFT</Link>
            <hr />
            <Link to="/new">New</Link>
            <Link to="/create">Create</Link>
            <Link to="/learn">Learn</Link>

            
             
        </div>
        <div className="nav-middle">
            <input type="text" placeholder='Search' />
        </div>
        <div className="nav-right">
            <ul>
            <Link  onClick={MetaMaskAuth}>Wallet</Link>
            <Link >Cart</Link>


            </ul>
        </div>
    </div>
  )
}

export default Nav