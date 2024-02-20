import './App.css';
import Nav from './Components/Nav';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Metamask from './Metamask';
import Create from './Pages/Create';
import Minting from './Pages/Minting';
import { useState } from 'react';
import {ethers} from 'ethers'


function App() {
  const [provider, setProvider]=useState(null)
  const [account, setAccount]=useState(null)
  const [isConnected, setIsConnected]=useState(false);
  async function connectWallet(){
    if(window.ethereum){
      try{
        const provider= new ethers.providers.Web3Provider(window.ethereum)
        setProvider(provider)
        await provider.send("eth_requestAccounts", []);
        const signer= provider.getSigner()
        const address=await signer.getAddress()
        setAccount(address)
        console.log("Metamask Connnected " + address)
        setIsConnected(true)
      }catch(err){
        console.log(err)
      }
    }else{
      console.error("Metamask not detected")
    }
  }
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='/' element={<Nav/>} ele/>
        <Route path='/create' element={<Create/> }/>
        <Route path='/create/minting' element={<Minting/>}/>
        </Routes>
        <button></button>
        
      </Router>
      {/* <Nav/>   */}
     {/* <Create/> */}
     {/* <Minting/> */}
      {/* <Metamask/> */}

    </div>
  );
}

export default App;
