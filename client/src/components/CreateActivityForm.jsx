import { useState } from "react";
import { createActivity } from "../api/activities";

export default function CreateActivityForm({ setUpdatedActivity }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorText, setErrorText] = useState("");

  async function handleClick() {
    try {
      if (!name || !description) return setErrorText("Missing required fields");
      const newActivity = await createActivity(name, description);

      setErrorText(newActivity.message);
      setUpdatedActivity(newActivity);
    } catch (error) {
      setErrorText(error.message);
      console.error(error);
    }
  }

  return (
    <div className="routine-form">
      <h3>Create a new activity</h3>
      <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="description" onChange={(e) => setDescription(e.target.value)} />
      <button onClick={handleClick}>Create</button>
      <p>{errorText}</p>
    </div>
  );
}
