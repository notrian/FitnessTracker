import { useNavigate } from "react-router-dom";
import "./Nav.css";
import useAuth from "../../hooks/useAuth";
export default function NavBar() {
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

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
        {isLoggedIn ? (
          <a
            onClick={() => {
              navigate("/my-routines");
            }}
          >
            My Routines
          </a>
        ) : (
          <></>
        )}
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
        {isLoggedIn ? (
          <button
            onClick={() => {
              navigate("/logout");
            }}
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        )}
      </span>
    </div>
  );
}
