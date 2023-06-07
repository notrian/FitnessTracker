import { useState } from "react";
import "./AuthForm.css";

export default function AuthForm({ authRoute }) {
  const [errorText, setErrorText] = useState("none");

  const [showPassword, setShowPassword] = useState("password");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleClick(e) {
    e.preventDefault();
    try {
      const resp = await fetch(`/api/auth/${authRoute}`, {
        // Use template literal to include reqRoute in the URL
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const result = await resp.json();
    } catch (err) {
      setErrorText(err.message);
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
