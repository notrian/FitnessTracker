export async function getRoutines() {
  try {
    const resp = await fetch(`/api/routines`);
    const result = await resp.json();
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createRoutine(name, goal, creatorId, isPublic) {
  try {
    const resp = await fetch(`/api/routines`, {
      method: "POST",
      body: JSON.stringify({
        name,
        goal,
        creatorId,
        isPublic,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await resp.json();
    return result;
  } catch (err) {
    console.error(err);
  }
}
