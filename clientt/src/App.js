import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Nav from "./components/Nav.jsx";
import Minting from "./pages/Minting.jsx";
import Test from "./pages/Test.jsx";
import Create from "./pages/Create.jsx";
import About from "./pages/About.jsx";

function App() {
  return (
    <>
      {/* <Nav /> */}
      <Router>
        <Routes>
          <Route path='/' element={<Nav/>} />
          <Route path="/create" element={<Create />} />
          <Route path="/create/minting" element={ <Minting/>} />
          <Route path="/about" element={ <About/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
