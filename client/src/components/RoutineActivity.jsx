import { useState } from "react";
import { deleteRoutineActivity, updateRoutineActivity } from "../api/routineActivities";

export default function RoutineActivity({ routineId, activity, setUpdatedRoutine, isAuthor }) {
  const { count, name, duration, description, routine_activity_id } = activity;

  const [newCount, setNewCount] = useState("");
  const [newDuration, setNewDuration] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [errorText, setErrorText] = useState("");

  async function handleClick() {
    try {
      const deletedRoutineActivity = await deleteRoutineActivity(routine_activity_id);
      setUpdatedRoutine(deletedRoutineActivity);
    } catch (e) {
      setShowEdit(true);
      setErrorText(e.message);
      console.error(e);
    }
  }

  async function handleRoutineActivityUpdate() {
    try {
      if (!newCount || !newDuration) return setErrorText("Missing required fields");
      const updatedRoutineActivity = await updateRoutineActivity(routine_activity_id, newCount, newDuration);
      setUpdatedRoutine(updatedRoutineActivity);
      // setShowEdit(false);
    } catch (e) {
      setErrorText(e.message);
      console.error(e);
      setShowEdit(true);
    }
  }

  return (
    <div className="activity routine-activity">
      <div className="flex-row-space-between">
        <p>
          x{count}, {name} ({duration} minutes)
        </p>
        {isAuthor ? <a onClick={handleClick}>Remove</a> : ""}
      </div>
      <p style={{ opacity: 0.75 }}>{description}</p>
      <div className="rem1-spacer"></div>
      {isAuthor && !showEdit ? (
        <button
          onClick={() => {
            setShowEdit(!showEdit);
          }}
          style={{ background: "#2e2d2d" }}
        >
          Edit
        </button>
      ) : (
        ""
      )}
      {isAuthor && showEdit ? (
        <div>
          {" "}
          <input type="number" placeholder="Count" value={newCount} onChange={(e) => setNewCount(e.target.value)} style={{ width: "100px", marginRight: "0.5rem" }} />
          <input
            type="number"
            placeholder="Duration (time in minutes)"
            value={newDuration}
            onChange={(e) => setNewDuration(e.target.value)}
            style={{ width: "calc(100% - 100px - 0.5rem)" }}
          />
          <div className="rem1-spacer"></div>
          <button onClick={handleRoutineActivityUpdate} style={{ marginRight: "0.25rem", background: "#2e2d2d" }}>
            Save
          </button>{" "}
          <button onClick={() => setShowEdit(false)} style={{ background: "#2e2d2d" }}>
            Cancel
          </button>
          <p>{errorText}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
