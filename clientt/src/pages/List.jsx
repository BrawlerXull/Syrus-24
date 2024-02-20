import React, { useState } from 'react';
import { ethers } from 'ethers';
import { NFTStorage } from 'nft.storage';
import { nft_abi, nft_address, marketplace_abi, marketplace_address } from '../constants/Constants';

const NFT_STORAGE_KEY = 'your-nft-storage-key';

const List = () => {
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
    const [items, setItems] = useState([]);
    const [img, setImg] = useState('');

    const listIte = async() =>{
      console.log("yay");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts' , []);
      const signer = provider.getSigner();
      const marketplace = new ethers.Contract(marketplace_address,marketplace_abi,signer);
      const items = await marketplace.getNft();
      const nft = new ethers.Contract(nft_address,nft_abi,signer);
      items.map(async (item) => {
        const uri = await nft.tokenURI(item.tokenId);
        console.log(uri);
      })
      console.log(items)
    }

    const listItems = async () => {
        try {
            if (!window.ethereum) {
                throw new Error('Ethereum provider not found. Please make sure MetaMask or another provider is installed and enabled.');
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();
            const nft = new ethers.Contract(nft_address, nft_abi, signer);
            const marketplace = new ethers.Contract(marketplace_address, marketplace_abi, signer);
            const items = await marketplace.getNft();
            setItems(items);
            console.log(items);
        } catch (error) {
            console.error('Error listing items:', error);
        }
    };

    const listNFT = async () => {
        try {
            const data = await nftstorage.get('bafyreia6mruvkp6p4chwyt2lbmjn6hresrkprwoc7te6ifab3otisggfue');
            console.log(data);

            if (!window.ethereum) {
                throw new Error('Ethereum provider not found. Please make sure MetaMask or another provider is installed and enabled.');
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();
            const nft = new ethers.Contract(nft_address, nft_abi, signer);
            const marketplace = new ethers.Contract(marketplace_address, marketplace_abi, signer);
            const item = await marketplace.items(5);
            const uri = await nft.tokenURI(item.tokenId);

            // Assuming uri is the image URL, set it to the state
            setImg(uri);
        } catch (error) {
            console.error('Error listing NFT:', error);
        }
    };

    return (
        <div>
            <button className='bg-white ml-24' onClick={listIte}>List</button>
            {img ? <img className='bg-black' src={img} alt='' /> : <p>No image available</p>}
        </div>
    );
};

export default List;
