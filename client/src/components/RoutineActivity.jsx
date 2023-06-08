export default function RoutineActivity({ activity }) {
  const { count, name, duration, description } = activity;

  return (
    <div className="activity routine-activity">
      <p>
        x{count}, {name} ({duration} minutes)
      </p>
      <p style={{ opacity: 0.75 }}>{description}</p>
    </div>
  );
}
