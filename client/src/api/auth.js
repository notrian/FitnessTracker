export async function login(username, password) {
  try {
    const resp = await fetch(`/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
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

export async function register(username, password) {
  try {
    const resp = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
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
