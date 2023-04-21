import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import Bookingsscreen from "./screens/Bookingsscreen";
import Loginscreen from "./screens/Loginscreen";
import Registerscreen from "./screens/Registerscreen";
import Aboutus from "./screens/Aboutus";

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar />
      
          <Routes>
          <Route path="/home" exact element={<Homescreen />}></Route>
          <Route path="/book/:id/:fromdate/:todate" exact element={<Bookingsscreen />}></Route>
          <Route path="/login" exact element={<Loginscreen />}></Route>
          <Route path="/register" exact element={<Registerscreen />}></Route>
          <Route path="/aboutus" exact element={<Aboutus />}></Route>
          
          </Routes>
        
      </BrowserRouter>
    </div>
  );
}
export default App;
