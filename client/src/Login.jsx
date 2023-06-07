import { useNavigate } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="page flexCentered">
      <div className="rem3-spacer"></div>
      <div className="rem3-spacer"></div>
      <div className="form">
        <h2>Login</h2>
        <AuthForm authRoute="login" />
        <p>
          <br />
          Need an account?
          <br />
          <a onClick={() => navigate("/register")}>Register</a>
        </p>
      </div>
    </div>
  );
}
