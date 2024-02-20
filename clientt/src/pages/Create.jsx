import React, { useState  } from 'react'
import "./Css/Create.css"
import image from "../Images/nft.png"
import Minting from './Minting'
import { useNavigate } from 'react-router-dom';


function Create() {

    const navigate = useNavigate();

  const mint = () => {
    // Redirect to the Minting page
    navigate('/create/minting');
  };
  const launch = () => {
    // Redirect to the Minting page
    navigate('/create/launch');
  };
  return (
    <div className='create'>

        <div className="left">
            
            <h1>Create</h1>
            <div className="btns">
            <button className='mint' onClick={mint}>
                <h2>Mint an NFt</h2>
                <p>Create your own Collection here, just Mint it!</p>
            </button>
            <button className='launch' onClick={launch}>
                <h2>Launch NFT</h2>
                <p>Drop your Collection here!</p>
                </button>

            <p className='linkk'><a href="https://opensea.io/learn/nft/minting-vs-dropping" target="_blank"> Learn more </a>about each option.</p>
            </div>
        </div>
        <div className="right">
            <img src={image} alt="" />
        </div>
    </div>
  )
}

export default Create