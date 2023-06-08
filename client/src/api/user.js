export async function getUser() {
  const resp = await fetch(`/api/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await resp.json();
  return result;
}
