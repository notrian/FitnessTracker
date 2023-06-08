import { useEffect, useState } from "react";
import { getRoutines } from "./api/routines";
import Routine from "./components/Routine";

export default function Routines() {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    async function getAllRoutines() {
      const result = await getRoutines();
      setRoutines(result);
    }
    getAllRoutines();
  }, []);

  return (
    <div className="page">
      <h1>Routines</h1>
      <div className="rem3-spacer"></div>
      <div className="all-routines-div">
        {routines.map((routine) => {
          return <Routine key={`routine-${routine.id}`} routine={routine} />;
        })}
      </div>
    </div>
  );
}
