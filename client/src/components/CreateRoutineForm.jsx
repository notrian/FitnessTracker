import { useState } from "react";
import { createRoutine } from "../api/routines";
import useAuth from "../hooks/useAuth";

export default function CreateRoutineForm() {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [errorText, setErrorText] = useState("");

  const { user } = useAuth();

  async function handleClick() {
    try {
      const newRoutine = await createRoutine(name, goal, user.id, !isPrivate);
      console.log(newRoutine);
      setErrorText(newRoutine.message);
    } catch (error) {
      setErrorText(error.message);
      console.error(error);
    }
  }

  return (
    <div className="routine-form">
      <h3>Create a new routine</h3>
      <input
        type="text"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="goal"
        onChange={(e) => setGoal(e.target.value)}
      />
      <span>
        <input
          type="checkbox"
          name="isPrivate"
          onChange={(e) => setIsPrivate(e.target.checked)}
        />
        <label style={{ marginLeft: "10px" }} htmlFor="isPrivate">
          Make it private
        </label>
      </span>
      <button onClick={handleClick}>Create</button>
    </div>
  );
}
