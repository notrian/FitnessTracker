export async function createRoutineActivity(routineId, activityId, count, duration) {
  try {
    const resp = await fetch(`/api/routineActivities`, {
      method: "POST",
      body: JSON.stringify({
        routineId,
        activityId,
        count,
        duration,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await resp.json();
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateRoutineActivity(routineActivityId, count, duration) {
  try {
    const resp = await fetch(`/api/routineActivities/${routineActivityId}`, {
      method: "PATCH",
      body: JSON.stringify({
        count,
        duration,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await resp.json();
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteRoutineActivity(routineActivityId) {
  try {
    const resp = await fetch(`/api/routineActivities/${routineActivityId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await resp.json();
    return result.data;
  } catch (error) {
    console.error(error);
  }
}
