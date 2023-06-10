import { useNavigate } from "react-router-dom";
import { deleteRoutine } from "../api/routines";
import useAuth from "../hooks/useAuth";
import RoutineActivity from "./RoutineActivity";
import { useEffect, useState } from "react";
import { createRoutineActivity } from "../api/routineActivities";
import { getActivities } from "../api/activities";

export default function Routine({ routine, setUpdatedRoutine }) {
  const { name, goal, creator_name, activities, id } = routine;
  const { user } = useAuth();

  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const [allActivities, setAllActivities] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(1);
  const [showActivities, setShowActivities] = useState(false);
  const [errorText, setErrorText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function getResults() {
      const result = await getActivities();
      setAllActivities(result);
    }
    getResults();
  }, []);

  async function handleDelete() {
    try {
      const deleted = await deleteRoutine(id);
      setUpdatedRoutine(deleted);
    } catch (error) {
      console.error(error);
    }
  }
  async function handleActivityAdd() {
    try {
      if (!currentSelection || !count || !duration) return setErrorText("Missing required fields");
      const addRoutineActivity = await createRoutineActivity(id, currentSelection, count, duration);
      if (!addRoutineActivity) {
        setErrorText("That activity is already apart of this routine.");
        setShowActivities(true);
        return;
      }
      setShowActivities(false);
      setUpdatedRoutine(addRoutineActivity);
    } catch (error) {
      setErrorText(error.message);
      setShowActivities(true);
    }
  }

  return (
    <div className="routine-div">
      <div className="flex-row-space-between">
        <h3>{name}</h3>
        <span style={{ opacity: 0.7, fontWeight: 500 }}>{creator_name}</span>
      </div>
      <p>{goal}</p>
      {activities ? (
        <div>
          <div className="rem1-spacer"></div>
          <h4>Activities</h4>
          <div className="rem05-spacer"></div>
          <div className="all-routine-activities-div">
            {activities.map((activity) => {
              return <RoutineActivity key={`routine-activity-${activity.activity_id}`} activity={activity} routineId={id} setUpdatedRoutine={setUpdatedRoutine} />;
            })}
          </div>
        </div>
      ) : (
        ""
      )}
      <div>
        {user?.username === creator_name && !showActivities ? (
          <div>
            <div className="rem1-spacer"></div>
            <button onClick={() => setShowActivities(!showActivities)}>Add Activity</button>{" "}
            <button
              onClick={() => {
                navigate(`/edit-routine/${id}`);
              }}
            >
              Edit
            </button>{" "}
            <button onClick={handleDelete}>Delete</button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        {showActivities ? (
          <div>
            <div className="rem1-spacer"></div>
            <select onChange={(e) => setCurrentSelection(e.target.value)} style={{ width: "100%" }}>
              {allActivities.map((activity) => {
                return (
                  <option key={`activity-option-${activity.name}`} value={activity.id}>
                    {activity.name}
                  </option>
                );
              })}
            </select>
            <div className="rem1-spacer"></div>
            <input type="number" placeholder="Count" value={count} onChange={(e) => setCount(e.target.value)} style={{ width: "100px", marginRight: "0.5rem" }} />
            <input
              type="number"
              placeholder="Duration (time in minutes)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              style={{ width: "calc(100% - 100px - 0.5rem)" }}
            />
            <div className="rem1-spacer"></div>
            <button onClick={handleActivityAdd} style={{ marginRight: "0.25rem" }}>
              Add
            </button>{" "}
            <button onClick={() => setShowActivities(false)}>Cancel</button>
            {errorText ? <p>{errorText}</p> : ""}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
