import { useNavigate } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="page flexCentered">
      <div className="rem3-spacer"></div>
      <div className="rem3-spacer"></div>
      <div className="form">
        <h2>Register</h2>
        <AuthForm authRoute="register" />
        <p>
          <br />
          Already have an account?
          <br />
          <a onClick={() => navigate("/login")}>Login</a>
        </p>
      </div>
    </div>
  );
}
