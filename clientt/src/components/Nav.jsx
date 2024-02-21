
import copyPng from '../assets/copy.png'
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import { nft_abi, nft_address, marketplace_abi, marketplace_address } from '../constants/Constants';
import Content from './Content';

function Nav() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [items, setItems] = useState([]);
  const [urls, setUrl] = useState([]);

  const listIte = async () => {
    console.log("yay");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const marketplace = new ethers.Contract(marketplace_address, marketplace_abi, signer);
    const items = await marketplace.getAllNft();
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

  async function buy(itemId) {
    try {
      console.log("yay");
      console.log(itemId);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const marketplace = new ethers.Contract(marketplace_address, marketplace_abi, signer );
      const items = await marketplace.getAllNft();
      const nft = new ethers.Contract(nft_address, nft_abi, signer);

      const itemIdNumber = itemId.toNumber();
      await marketplace.Buy(itemIdNumber, {value: marketplace.getTotalPrice(itemIdNumber) , gasLimit: ethers.BigNumber.from(9999999) },);
      console.log("succ it baby");
    } catch (e) {
      console.log("error deleting" + e);
    }
  }

  useEffect(() => {
    async function checkLoggedIn() {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(provider);
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            const address = accounts[0];
            setAccount(address);
            setIsConnected(true);
          }
          listIte();
        } catch (err) {
          console.log(err);
        }
      }
    }
    checkLoggedIn();
  }, []);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setIsConnected(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.error("Metamask not detected");
    }
  }

  return (
    <div className='navbar pt-7 pl-8 pr-8'>
      <nav className="flex items-center justify-between  flex-wrap bg-transparent pb-12">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span id='gennft-title' className="font-semibold text-5xl tracking-tight pr-7 text-gradient-purple-pink-2">GenNFT</span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link to="/create" className="block mt-4 lg:inline-block lg:mt- hover:text-white text-white mr-4">
              Create
            </Link>
            <Link to="/about" className="block mt-4 lg:inline-block lg:mt- hover:text-white text-white mr-4">
              About
            </Link>
          </div>
          {isConnected ? (
            <div className='flex flex-col w-28 px-6 font-semibold rounded-md border border-slate-200 text-white mt-2 hidden lg:block'>
              <span className="text-white inline-block mt-4 lg:mt-0">LogedIn</span>
              <div className='flex'>
                <h4 className="text-white inline-block mt-4 lg:mt-0 overflow-hidden text-ellipsis text-xs	">{account}</h4>
              </div>

            </div>
          ) : (
            <div>
              <a href="#" onClick={connectWallet} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Login</a>
            </div>
          )}
        </div>
      </nav>
      <Content/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 p-10">
        {items.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5">
              <img src={urls[index]} alt="" className='rounded-lg' />
            </div>
            <div className='flex justify-center items-center flex-col text-center '>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{parseFloat(item.price.toString())}</h5>
              <button onClick={() => buy(item.itemId)} variant="primary" size="lg" className=" hover:bg-gray-700 text-white border rounded-lg p-3 border-white mt-3 mb-3 w-20">
                Buy
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Nav;
