import React, { useState } from 'react';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { ethers } from 'ethers';
import { NFTStorage, File } from 'nft.storage';

const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDlGM2Q5YzZGRjFCNjEzNDZEYzU4Njk2NTE3NTU0RkUwMkQ0NURFNEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwODQxNDU5ODQ3NywibmFtZSI6Im5mdCJ9.2LSFFAkB7peugZbevlG0i9rWXqfy_FWnvF-qzlfx1BU';
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
const { nft_abi, marketplace_abi, nft_address, marketplace_address } = require('../constants/Constants');

function Test() {
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
      const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
      const file = new File([selectedFile], selectedFile.name, { type: selectedFile.type });
      const result = await nftstorage.store({
        name,
        description,
        image: file
      });
      console.log(result);
      setResult(result)
      console.log(result.url);
      createNFT(result.url);
    } catch (error) {
      console.log("ipfs image upload error: ", error);
    }
  }

  const createNFT = async (imageUrl) => {
    if (!imageUrl || !name || !description || !price || !royalty || !donation) return;
    try {
      mintThenList(result);
      console.log("succ ")
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
    }
  }

  const mintThenList = async (result) => {
    try{const uri = `result.url`
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const nft = new ethers.Contract(nft_address, nft_abi, signer);
    const marketplace = new ethers.Contract(marketplace_abi, marketplace_abi, signer);
    await (await nft.mint(uri)).wait();
    const id = await nft.tokenCount();
    await (await nft.setApprovalForAll(marketplace.address, true)).wait();
    const listingPrice = ethers.utils.parseEther(price.toString());
    await (await marketplace.makeItem(nft.address, id, listingPrice)).wait();
    console.log(nft.address);}
    catch(err){console.log(err)}
  }

  return (
    <div>
      <input
        type="file"
        required
        name="file"
        onChange={handleFileChange}
      />
      <input type="text" onChange={(e) => setName(e.target.value)} size="lg" placeholder="Name" />
      <input type="text" onChange={(e) => setDescription(e.target.value)} size="lg" placeholder="Description" />
      <input type="number" onChange={(e) => setPrice(parseFloat(e.target.value))} size="lg" placeholder="Price in ETH" />
      <input type="number" onChange={(e) => setRoyalty(parseFloat(e.target.value))} size="lg" placeholder="Royalty %" />
      <input type="number" onChange={(e) => setDonation(parseFloat(e.target.value))} size="lg" placeholder="Donation %" />
      <div className="d-grid px-0">
        <button onClick={uploadToIPFS} variant="primary" size="lg">
          Create & List NFT!
        </button>
      </div>
    </div>
  )
}

export default Test;
