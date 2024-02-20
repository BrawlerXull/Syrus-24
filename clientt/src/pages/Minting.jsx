import React, { useState, useEffect } from "react";
import dogPng from "../assets/dog.png";
import "../pages/create.css";
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { ethers } from 'ethers';
import axios from 'axios'
import { NFTStorage, File } from 'nft.storage';

const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDlGM2Q5YzZGRjFCNjEzNDZEYzU4Njk2NTE3NTU0RkUwMkQ0NURFNEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwODQxNDU5ODQ3NywibmFtZSI6Im5mdCJ9.2LSFFAkB7peugZbevlG0i9rWXqfy_FWnvF-qzlfx1BU';
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
const { nft_abi, marketplace_abi, nft_address, marketplace_address } = require('../constants/Constants');


function Minting() {
  // const [selectedFile, setSelectedFile] = useState(null);

  // useEffect(() => {
  //   console.log(selectedFile);
  // }, [selectedFile]);

  // const handleFileChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [royalty, setRoyalty] = useState(0);
  const [donation, setDonation] = useState(0);
  const [result, setResult] = useState()
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadToIPFS = async () => {
    if (!selectedFile) return;
    try {
      const resFile = await axios({
        method : "post",
        url : "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data : {
          file : selectedFile,
          name : name,
          description : description
        },
        headers : {
          pinata_api_key : `568009af9408ff295278`,
          pinata_secret_api_key : `5a4f6a57254e60dab0a8a20a9d5ecce812c6b4473a98bcd92158cfd1d91a8dd1`,
          'Content-Type' : 'multipart/form-data'
        }
      });
      const uri = resFile.data.IpfsHash;
      createNFT(uri);
    } catch (error) {
      console.log("ipfs image upload error: ", error);
    
    }
    // ipfs.add(file, (err, result) => {
    //   if (err) {
    //     console.error('Error uploading file to IPFS:', err);
    //   } else {
    //     const imageCID = result[0].hash;
    //     const imageURL = https://ipfs.io/ipfs/${imageCID};
    //     console.log('Image uploaded to IPFS. URL:', imageURL);
    //   }
    // });
  }


  const createNFT = async (imageUrl) => {
    if (!imageUrl || !name || !description || !price || !royalty || !donation) return;
    try {
      await mintThenList(imageUrl);
      console.log("succ ")
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
    }
  }

  const mintThenList = async (result) => {
    try {
      // console.log(result['data'])
      const uri= `https://gateway.pinata.cloud/ipfs/${result}`
      console.log(uri)
    // return
    console.log("res " + result)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const nft = new ethers.Contract(nft_address, nft_abi, signer);
    console.log(nft.address);
    const marketplace = new ethers.Contract(marketplace_address, marketplace_abi, signer);
    await (await nft.mint(uri)).wait();
    const id = await nft.tokenCount();
    await (await nft.setApprovalForAll(marketplace.address, true)).wait();
    const listingPrice = ethers.utils.parseEther(price.toString());
    await (await marketplace.makeNFT(nft.address, id, listingPrice, donation, royalty)).wait();
    console.log("suc");
  }catch(err){console.log(err)}
  }
  

  return (
    <div className="flex justify-center">
      <img src={dogPng} alt="" className=" h-100 mr-48 mt-40" />
      <div className="justify-center">
        <div className="text-4xl font-bold text-white  ml-36 mt-60" id="nft-title">
          Create your NFTs
        </div>
        <div className="mt-10">
          <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input type="text" onChange={(e) => setName(e.target.value)} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
        </div>
        <div className="mt-10">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discription</label>
          <input type="text" onChange={(e) => setDescription(e.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Discription" required />
        </div>
        <div className="mt-10">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price in ETH</label>
          <input type="number" onChange={(e) => setPrice(parseFloat(e.target.value))} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Price in ETH" required />
        </div>
        <div className="mt-10">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Royalty</label>
          <input type="number" onChange={(e) => setRoyalty(parseFloat(e.target.value))} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Royalty in %" required />
        </div>
        <div className="mt-10">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Minting</label>
          <input type="number" onChange={(e) => setDonation(parseFloat(e.target.value))} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" Fixed Donation %" required />
        </div>
        
        <div className="flex">
        <div className="mt-10  " >
          <input type="file" onChange={handleFileChange} className=" border border-white" />
        </div>
        <button onClick={uploadToIPFS} variant="primary" size="lg" className="text-white border rounded-lg p-3 border-white mt-7">
          Create & List NFT!
        </button>
        </div>
      </div>
    </div>
  );
}

export default Minting;





// API Key: 568009af9408ff295278
//  API Secret: 5a4f6a57254e60dab0a8a20a9d5ecce812c6b4473a98bcd92158cfd1d91a8dd1
//  JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5Y2U4MDI0MS0wMjBmLTQ1MmMtOGFjOS05NTVlNDU2ZmNmMDkiLCJlbWFpbCI6ImNoYXVkaGFyaS5jaGlubWF5MTIzNDVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjU2ODAwOWFmOTQwOGZmMjk1Mjc4Iiwic2NvcGVkS2V5U2VjcmV0IjoiNWE0ZjZhNTcyNTRlNjBkYWIwYThhMjBhOWQ1ZWNjZTgxMmM2YjQ0NzNhOThiY2Q5MjE1OGNmZDFkOTFhOGRkMSIsImlhdCI6MTcwODQ0NzEzMH0.7KPGthSxM-LHAhampLsczk_RrJj7QKgrhBI6vSOcQ-0