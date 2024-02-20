
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Nav from "./components/Nav.jsx";




function App() {
    return (
        <Nav />
        // <Router>
        //     <Routes>
        //         <Route path='/' element={<Home /> }/>

        //     </Routes>
        // </Router>
    );
}

export default App;
