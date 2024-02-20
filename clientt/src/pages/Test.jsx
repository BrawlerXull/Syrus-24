import React, { useState } from 'react'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { nft_abi, marketplace_abi, nft_address, marketplace_address } from '../Constants/Constants'
import {ethers} from 'ethers' 
// require("dotenv").config();
// const { NFT, Marketplace } = process.env;
// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage, File } from 'nft.storage'

import mime from 'mime'

const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDlGM2Q5YzZGRjFCNjEzNDZEYzU4Njk2NTE3NTU0RkUwMkQ0NURFNEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwODQwODc0ODI1MSwibmFtZSI6InN5cnVzIn0.gbMTQIeYeDGjFoba_3eARWU-Iz8vr2gFNgab7Ci2dWQ'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

// const pinataSDK = require('@pinata/sdk');
// const pinata = new pinataSDK({ pinataJWTKey: 'yourPinataJWTKey'});
// const upload = await pinata.pinFileToIPFS('./metadata.json'); 
function Test() {
  const [name, setName]=useState("")
  const [description, setDescription]=useState("")
  const [image, setImage]=useState()
  const [price, setPrice]=useState()
  const [royalty, setRoyaty]=useState()
  const [donaton, setDonation]=useState()
  const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result)
    };
    reader.readAsDataURL(file);
    })
  const uploadToIPFS=async (e)=>{
    e.preventDefault();
    const file=e.target.files[0];
    console.log(file)
    if (typeof file !== 'undefined') {
        try {
            const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })
            fileToDataUri(file)
        .then (async (dataUri) =>  {
            const result= await nftstorage.store({
                dataUri, 
                name, 
                description
            })
            console.log(result)
      })
        } catch (error){
          console.log("ipfs image upload error: ", error)
        }
    }else{
        console.log("Error in Image")
    }
  }

  const createNFT = async () => {
    if (!image || !name ) return
    try{
      const result = await client.add(JSON.stringify({image, name}))
      mintThenList(result)
    } catch(error) {
      console.log("ipfs uri upload error: ", error)
    }
  }
  const mintThenList = async (result) => {
    const uri = `https://ipfs.infura.io/ipfs/${result.path}`
    const provider= new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer= provider.getSigner()
    const nft=new ethers.Contract(nft_address,nft_abi, signer)
    const marketplace=new ethers.Contract(marketplace_abi, marketplace_abi, signer)
    await(await nft.mint(uri)).wait()
    const id = await nft.tokenCount()
    await(await nft.setApprovalForAll(marketplace.address, true)).wait()
    const listingPrice = ethers.utils.parseEther(price.toString())
    await(await marketplace.makeItem(nft.address, id, listingPrice)).wait()
    console.log(nft.address)
    // console.log()
  }

  return (
    <div>
        <input
                type="file"
                required
                name="file"
                onChange={uploadToIPFS}
              />
              <input type="text" onChange={(e) => setName(e.target.value)} size="lg" placeholder="Name" />
              <input type="text" onChange={(e) => setDescription(e.target.value)} size="lg" placeholder="Description" />
              {/* <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" /> */}
              {/* <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" /> */}
              <div className="d-grid px-0">
                <button onClick={createNFT} variant="primary" size="lg">
                  Create & List NFT!
                </button>
              </div>
    </div>
  )
}

export default Test