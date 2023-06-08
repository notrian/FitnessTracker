import { useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { useEffect, useState } from "react";

export default function Logout() {
  const navigate = useNavigate();

  const { setUser, setIsLoggedIn } = useAuth();

  const [logoutText, setLogoutText] = useState("");

  useEffect(() => {
    async function logoutUser() {
      try {
        const response = await fetch("/api/auth/logout");
        const result = await response.json();

        setUser({});
        setIsLoggedIn(false);
        setLogoutText(result.message);

        setTimeout(() => {
          navigate("/");
        }, 2500);
      } catch (err) {
        setLogoutText(err.message);
      }
    }
    logoutUser();
  }, []);

  return (
    <div className="page flexCentered">
      <h1 style={{ fontSize: "38px", marginTop: "5rem" }}>{logoutText}</h1>
    </div>
  );
}
