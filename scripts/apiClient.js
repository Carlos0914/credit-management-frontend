import { BASE_URL } from "@env";
console.log("Client is running on ", BASE_URL);

async function apiClient(endpoint, options = {}) {
  const url = `${BASE_URL}/${endpoint}`;
  console.log("Fetching data from ", url);
  const response = await fetch(url, {
    headers: new Headers({
      "ngrok-skip-browser-warning": "69420",
    }),
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (!data || typeof data !== "object") {
    throw new Error("Invalid data received from the API");
  }

  return data;
}

export default apiClient;
