import { useEffect, useState } from "react";
import Activity from "./components/Activity";
import { getActivities } from "./api/activities";

export default function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function getAllActivities() {
      const result = await getActivities();
      setActivities(result);
    }
    getAllActivities();
  }, []);

  return (
    <div className="page">
      <h1>Activities</h1>
      <div className="rem3-spacer"></div>
      <div className="all-activities-div">
        {activities.map((activity) => {
          return <Activity key={`activity-${activity.id}`} activity={activity} />;
        })}
      </div>
    </div>
  );
}
