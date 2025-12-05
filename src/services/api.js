const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

export async function apiRequest(endpoint, method = "GET", body) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_URL}${endpoint}`, options);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "API request failed");
  }

  return await res.json();
}
