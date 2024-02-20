
import copyPng from '../assets/copy.png'
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';

function Nav() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

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
    <div className='navbar'>
      <nav className="flex items-center justify-between flex-wrap bg-transparent p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">GenNFT</span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link to="/create" className="block mt-4 lg:inline-block lg:mt- hover:text-white text-white mr-4">
              Create
            </Link>
            <Link to="/about" className="block mt-4 lg:inline-block lg:mt- hover:text-white text-white mr-4">
              About
            </Link>
            <a href="/view" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white">
              View
            </a>
          </div>
          {isConnected ? (
            <div className='flex flex-col w-28 px-6 font-semibold rounded-md border border-slate-200 text-white mt-10 '>
              <span className="text-white inline-block mt-4 lg:mt-0">LogedIn</span>
              <div className='flex'>
                <h4 className="text-white inline-block mt-4 lg:mt-0 overflow-hidden text-ellipsis text-xs	">{account}</h4>
                {/* <img src={copyPng} alt="" className='bg-white' /> */}
              </div>

            </div>
          ) : (
            <div>
              <a href="#" onClick={connectWallet} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Login</a>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Nav;
