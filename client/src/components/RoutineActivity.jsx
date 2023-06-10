import { deleteRoutineActivity } from "../api/routineActivities";

export default function RoutineActivity({ routineId, activity, setUpdatedRoutine }) {
  const { count, name, duration, description, routine_activity_id } = activity;

  async function handleClick() {
    try {
      const deletedRoutineActivity = await deleteRoutineActivity(routine_activity_id);
      setUpdatedRoutine(deletedRoutineActivity);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="activity routine-activity">
      <p>
        x{count}, {name} ({duration} minutes)
      </p>
      <p style={{ opacity: 0.75 }}>{description}</p>
      <a onClick={handleClick}>Remove</a>
    </div>
  );
}
