export async function getRoutines() {
  try {
    const resp = await fetch(`/api/routines`);
    const result = await resp.json();
    return result.data;
  } catch (error) {
    console.error(error);
  }
}
