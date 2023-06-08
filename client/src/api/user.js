export async function getUser() {
  try {
    const resp = await fetch(`/api/users/me`, {
      method: "GET",
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

export async function getUserRoutines(username) {
  try {
    const resp = await fetch(`/api/users/${username}/routines`, {
      method: "GET",
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
