import { useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import CreateRoutineForm from "./components/CreateRoutineForm";

export default function MyRoutines() {
  const { isLoggedIn } = useAuth();

  const naviagte = useNavigate();

  if (!isLoggedIn) naviagte("/login");

  return (
    <div className="page">
      <h1>My Routines</h1>
      <div className="rem3-spacer"></div>
      <CreateRoutineForm />
    </div>
  );
}
