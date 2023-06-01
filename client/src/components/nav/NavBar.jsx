import { useNavigate } from "react-router-dom";
import "./Nav.css";
export default function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="nav">
      <h2>Fitness Tracker</h2>
      <span className="nav-list">
        <a
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </a>
        <a
          onClick={() => {
            navigate("/routines");
          }}
        >
          Routines
        </a>
        <a
          onClick={() => {
            navigate("/activities");
          }}
        >
          Activities
        </a>
      </span>
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </button>
    </div>
  );
}
