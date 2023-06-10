import { useNavigate } from "react-router-dom";
import image from "./assets/logo.png";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="page">
      <div className="flexCentered">
        <div className="rem3-spacer"></div>
        <img src={image} style={{ width: "20rem" }} alt="Fitness Tracker Logo" />
        <div className="rem3-spacer"></div>
        <h1 style={{ lineHeight: "68px" }}>Welcome to Fitness!</h1>
        <div className="rem1-spacer"></div>
        <div className="rem1-spacer"></div>
        <button onClick={() => navigate("/login")}>Get Started</button>
      </div>
    </div>
  );
}
