import { useState } from "react";
import { editRoutine } from "../api/routines";
import { useNavigate, useParams } from "react-router-dom";
export default function EditRoutineForm() {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  async function handleClick() {
    try {
      const newRoutine = await editRoutine(id, !isPrivate, name, goal);
      setErrorText(newRoutine.message);
      setTimeout(() => {
        navigate("/my-routines");
      }, 3000);
    } catch (error) {
      setErrorText(error.message);
      console.error(error);
    }
  }
  return (
    <div className="routine-form" style={{ minWidth: "350px" }}>
      <h3>Edit routine {`"${"routineName"}"`}</h3>
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
      <button onClick={handleClick}>Update</button>
      <p>{errorText}</p>
    </div>
  );
}
