export default function Activity({ activity }) {
  const { name, description } = activity;

  return (
    <div className="activity">
      <p>{name}</p>
      <p style={{ opacity: 0.75 }}>{description}</p>
    </div>
  );
}
