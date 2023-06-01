import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/nav/NavBar.jsx";
import Home from "./Home";
import Routines from "./Routines";
import Activities from "./Activities";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/activities" element={<Activities />} />
      </Routes>
    </div>
  );
}

export default App;
