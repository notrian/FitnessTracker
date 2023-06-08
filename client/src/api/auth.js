export async function login(username, password) {
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
}

export async function register(username, password) {
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
}
