
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { nft_abi, nft_address, marketplace_abi, marketplace_address } from '../constants/Constants';

function Launch() {

  const [items, setItems] = useState([]);
  const [urls, setUrl] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [price, setPrice] = useState('');
  const handleClick = () => {
    setShowPopup(true);
  };
  const handleInputChange = (e) => {
    setPrice(e.target.value);
  };
  const handleSavePrice = async (itemId) => {
    await sell( price, itemId)

    console.log('Saving price:', price);
    setShowPopup(false); 
  };

  async function sell(price , itemId) {
    try {
      console.log("yay");
      console.log(itemId);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const marketplace = new ethers.Contract(marketplace_address, marketplace_abi, signer);
      const items = await marketplace.getNft();
      const nft = new ethers.Contract(nft_address, nft_abi, signer);

      const itemIdNumber = itemId.toNumber();

      await marketplace.Sell(itemIdNumber , price);
      console.log("succ it babyy");
    } catch (e) {
      console.log("error selling" + e);
    }
  }



  function isPresent(str) {
    const substr = 'gateway';
    console.log(str?.includes(substr));
    return str?.includes(substr);
  }

  async function remove(itemId) {
    try {
      console.log("yay");
      console.log(itemId);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const marketplace = new ethers.Contract(marketplace_address, marketplace_abi, signer);
      const items = await marketplace.getNft();
      const nft = new ethers.Contract(nft_address, nft_abi, signer);

      const itemIdNumber = itemId.toNumber();

      await marketplace.removeNFT(itemIdNumber);
      console.log("succ it baby");
    } catch (e) {
      console.log("error deleting" + e);
    }
  }


  const listIte = async () => {
    console.log("yay");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const marketplace = new ethers.Contract(marketplace_address, marketplace_abi, signer);
    const items = await marketplace.getNft();
    const nft = new ethers.Contract(nft_address, nft_abi, signer);

    const uris = await Promise.all(items.map(async (item) => {
      const uri = await nft.tokenURI(item.tokenId);
      console.log(uri);
      return uri;
    }));

    console.log(items);
    setItems(items);
    setUrl(uris);
    console.log("url" + urls);
  }

  useEffect(() => {
    listIte()
  }, []);
  return (
    <div className='flex justify-center text-white items-center flex-col'>
      <h1 className=' text-white text-7xl mt-10 text-gradient-purple-pink-2  ' id='normie-title'>Hello, Normie</h1>
      <h1 className=' text-white text-5xl mt-10 text-gradient-purple-pink-2  ' id='normie-title'>Here are your NFTs</h1>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {items.map((item, index) => {
          return isPresent(urls[index]) ? (
            <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="p-5 ">
                <img src={urls[index]} alt="" className=' rounded-lg' />
                <div className='flex justify-between'>
                  <button variant="primary" size="lg" className="text-white border rounded-lg p-3 border-white mt-7" onClick={handleClick}>
                    List to sell
                  </button>
                  {showPopup && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                      <div className="bg-white p-8 rounded-lg">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Enter Price
                        </label>
                        <input
                          type="text"
                          id="price"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                        />
                        <button
                          onClick={() => handleSavePrice(item.itemId)}
                          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Sell
                        </button>
                      </div>
                    </div>
                  )}
                  <button onClick={() => remove(item.itemId)} variant="primary" size="lg" className="text-white border rounded-lg p-3 border-white mt-7">
                    Unlist NFT
                  </button>
                </div>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
  
}

export default Launch