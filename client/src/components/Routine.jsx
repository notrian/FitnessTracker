import RoutineActivity from "./RoutineActivity";

export default function Routine({ routine }) {
  const { name, goal, creator_name, activities } = routine;

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
              return <RoutineActivity key={`routine-activity-${activity.activity_id}`} activity={activity} />;
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
