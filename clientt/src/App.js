import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Nav from "./components/Nav.jsx";
import Create from "./pages/Create.jsx";
import Test from "./pages/Test.jsx";

function App() {
  return (
    <>
      {/* <Nav /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Test />} />
          {/* <Route path="/create" element={<Create />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
