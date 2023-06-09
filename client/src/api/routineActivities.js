export async function getActivities() {
  try {
    const resp = await fetch(`/api/routineActivities`);
    const result = await resp.json();
    return result.data;
  } catch (error) {
    console.error(error);
  }
}
