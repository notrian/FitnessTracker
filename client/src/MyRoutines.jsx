import { useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

export default function MyRoutines() {
  const { isLoggedIn } = useAuth();

  const naviagte = useNavigate();

  if (!isLoggedIn) naviagte("/login");

  return (
    <div className="page">
      <p>activities</p>
    </div>
  );
}
