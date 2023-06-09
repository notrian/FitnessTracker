export async function getActivities() {
  try {
    const resp = await fetch(`/api/activities`);
    const result = await resp.json();
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createActivity(name, description) {
  try {
    const resp = await fetch(`/api/activities`, {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
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
