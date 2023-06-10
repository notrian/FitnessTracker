import { useEffect, useState } from "react";
import Activity from "./components/Activity";
import { getActivities } from "./api/activities";
import useAuth from "./hooks/useAuth";
import CreateActivityForm from "./components/CreateActivityForm";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [updatedActivity, setUpdatedActivity] = useState([]);

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    async function getAllActivities() {
      const result = await getActivities();
      setActivities(result);
    }
    getAllActivities();
  }, [updatedActivity]);

  return (
    <div className="page">
      <h1>Activities</h1>
      <div className="rem3-spacer"></div>
      {isLoggedIn ? <CreateActivityForm setUpdatedActivity={setUpdatedActivity} /> : ""}
      <div className="rem1-spacer"></div>
      <div className="all-activities-div">
        {activities.map((activity) => {
          return <Activity key={`activity-${activity.id}`} activity={activity} />;
        })}
      </div>
    </div>
  );
}
