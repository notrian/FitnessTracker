import { useState } from "react";
import "./AuthForm.css";
import { login, register } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ authRoute }) {
  const [errorText, setErrorText] = useState("none");

  const [showPassword, setShowPassword] = useState("password");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUser, setIsLoggedIn } = useAuth();

  const navigate = useNavigate();

  async function handleClick(e) {
    e.preventDefault();
    try {
      if (authRoute === "login") {
        const result = await login(username, password);
        handleResult(result);
      } else if (authRoute === "register") {
        const result = await register(username, password);
        handleResult(result);
      }
    } catch (err) {
      setErrorText(err.message);
    }
  }

  function handleResult(result) {
    if (result.data?.username) {
      setErrorText("Successfully logged in!");
      setUser(result.data);
      setIsLoggedIn(true);
      setTimeout(() => {
        navigate("/my-routines");
      }, 2000);
    } else {
      setErrorText(result.message || "An unkown error has occured.");
    }
  }

  return (
    <form action="" className="auth-form">
      <input type="text" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} />
      <input type={showPassword} placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
      <p
        className="show-hide"
        onClick={() => {
          showPassword === "password" ? setShowPassword("text") : setShowPassword("password");
        }}
      >
        {showPassword === "password" ? "Show Password" : "Hide Password"}
      </p>
      <button onClick={handleClick}>Submit</button>
      {errorText !== "none" ? <p>{errorText}</p> : ""}
    </form>
  );
}
