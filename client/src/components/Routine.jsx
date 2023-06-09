import { deleteRoutine } from "../api/routines";
import useAuth from "../hooks/useAuth";
import RoutineActivity from "./RoutineActivity";

export default function Routine({ routine }) {
  const { name, goal, creator_name, activities, id } = routine;
  const { user } = useAuth();

  async function handleDelete() {
    try {
      const deleted = await deleteRoutine(id);
      console.log(deleted);
    } catch (error) {
      console.error(error);
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
              return (
                <RoutineActivity
                  key={`routine-activity-${activity.activity_id}`}
                  activity={activity}
                />
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
      <div>
        {user?.username === creator_name ? (
          <div>
            <div className="rem1-spacer"></div>
            <button>Edit</button> <button onClick={handleDelete}>Delete</button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
