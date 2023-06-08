import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/nav/NavBar.jsx";
import Home from "./Home";
import Routines from "./Routines";
import Activities from "./Activities";
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import MyRoutines from "./MyRoutines";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/my-routines" element={<MyRoutines />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
