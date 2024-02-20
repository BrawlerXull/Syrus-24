import React from 'react'
import "./Css/Minting.css"
import DragDrop from '../Components/DragAndDrop'

function Minting() {
  return (
    <div className='minting'>
        <h1>Minting NFT</h1>
        <div className="content">
        <div className="left">
            <div className='input-value'>
                <label htmlFor="name">Name*</label>
                <input type="text" placeholder='Name your NFT' id='name' />
            </div>
            <div className='input-value'>
                <label htmlFor="Description">Description*</label>
                <textarea type="text" placeholder='Describe your NFT' id='name' />

            </div>
            <div className='input-value'>
                <label htmlFor="supply">Supply*</label>
                <input type="number" placeholder='1' id='supply' />
            </div>
        </div>
        <div className="right">
            <h2>Create your NFT</h2>
            <p>Once your item is Minted no changes can bee made </p>
            <DragDrop/>
        </div>
        </div>
    </div>
  )
}

export default Minting