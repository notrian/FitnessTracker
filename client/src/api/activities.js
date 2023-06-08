export async function getActivities() {
  try {
    const resp = await fetch(`/api/activities`);
    const result = await resp.json();
    return result.data;
  } catch (error) {
    console.error(error);
  }
}
