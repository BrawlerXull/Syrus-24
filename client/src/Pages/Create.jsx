import React from 'react'
import "./Css/Create.css"
import image from "../Images/nft.png"

function Create() {
  return (
    <div className='create'>

        <div className="left">
            
            <h1>Create</h1>
            <div className="btns">
            <button className='mint'>
                <h2>Mint an NFt</h2>
                <p>Create your own Collection here, just Mint it!</p>
            </button>
            <button className='launch'>
                <h2>Launch NFT</h2>
                <p>Drop your Collection here!</p>
                </button>
            </div>
        </div>
        <div className="right">
            <img src={image} alt="" />
        </div>
    </div>
  )
}

export default Create