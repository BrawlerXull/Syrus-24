import React, { useState } from 'react';
import { ethers } from 'ethers';

const MetaMaskAuth = () => {
  const [userAddress, setUserAddress] = useState(null);

  const signInWithMetaMask = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        setUserAddress(address);
      } else {
        console.error('MetaMask is not installed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUserAddress(null);
  };

  return (
    <div>
      {userAddress ? (
        <>
          <p>Signed in with MetaMask. Address: {userAddress}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={signInWithMetaMask}>Sign In with MetaMask</button>
      )}
    </div>
  );
};

export default MetaMaskAuth;
