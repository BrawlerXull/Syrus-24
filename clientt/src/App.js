import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Nav from "./components/Nav.jsx";
import Create from "./pages/Create.jsx";

function App() {
  return (
    <>
      {/* <Nav /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Create />} />
          {/* <Route path="/create" element={<Create />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
