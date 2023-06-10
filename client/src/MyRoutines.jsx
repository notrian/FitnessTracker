import { useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import CreateRoutineForm from "./components/CreateRoutineForm";
import { useEffect, useState } from "react";
import { getUserRoutines } from "./api/user";
import Routine from "./components/Routine";

export default function MyRoutines() {
  const navigate = useNavigate();

  const [routines, setRoutines] = useState([]);
  const [updatedRoutine, setUpdatedRoutine] = useState([]);

  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    async function getAllRoutines() {
      const result = await getUserRoutines(user.username);
      setRoutines(result.data);
    }
    if (!isLoggedIn) return navigate("/login");
    getAllRoutines();
  }, [updatedRoutine]);

  return (
    <div className="page">
      <h1>My Routines</h1>
      <div className="rem3-spacer"></div>
      <CreateRoutineForm setUpdatedRoutine={setUpdatedRoutine} />
      <div className="rem3-spacer"></div>
      <hr />
      <div className="rem3-spacer"></div>
      <div className="all-routines-div">
        {routines
          ? routines.map((routine) => {
              return <Routine key={`my-routine-${routine.id}`} routine={routine} setUpdatedRoutine={setUpdatedRoutine} />;
            })
          : ""}
      </div>
    </div>
  );
}
