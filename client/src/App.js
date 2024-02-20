import './App.css';
import Nav from './Components/Nav';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Metamask from './Metamask';
import Create from './Pages/Create';
import Minting from './Pages/Minting';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='/' element={<Nav/>} ele/>
        <Route path='/create' element={<Create/> }/>
        <Route path='/create/minting' element={<Minting/>}/>
        <Route path='/wallet' element={<Metamask/>}/>
        </Routes>
        
      </Router>
      {/* <Nav/>   */}
     {/* <Create/> */}
     {/* <Minting/> */}
      {/* <Metamask/> */}

    </div>
  );
}

export default App;
