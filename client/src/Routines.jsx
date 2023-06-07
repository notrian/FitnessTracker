export default function Routines() {
  return (
    <div className="page">
      <h1>Routines</h1>
      <div className="rem3-spacer"></div>
      <div className="all-routines-div">
        <div className="routine-div">
          <div className="flex-row-space-between">
            <h3>Routine Name</h3>
            <span style={{ opacity: 0.7, fontWeight: 500 }}>Author Name</span>
          </div>
          <p>Goal, this is where the goal will go</p>
          <div className="rem1-spacer"></div>
          <h4>Activities</h4>
          <div className="rem05-spacer"></div>
          <div className="activity">
            <p>Count, Name (Time)</p>
            <p style={{ opacity: 0.75 }}>Description</p>
          </div>
        </div>
      </div>
    </div>
  );
}
