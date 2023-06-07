import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/nav/NavBar.jsx";
import Home from "./Home";
import Routines from "./Routines";
import Activities from "./Activities";
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
