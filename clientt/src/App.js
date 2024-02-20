import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Nav from "./components/Nav.jsx";
import Minting from "./pages/Minting.jsx";
import Test from "./pages/Test.jsx";
import Create from "./pages/Create.jsx";

function App() {
  return (
    <>
      {/* <Nav /> */}
      <Router>
        <Routes>
          <Route path='/' element={<Nav/>} />
          <Route path="/create" element={<Create />} />
          <Route path="/create/minting" element={ <Minting/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
