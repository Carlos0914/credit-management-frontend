console.log("Client is running on ", process.env.EXPO_PUBLIC_BASE_URL);

async function apiClient(endpoint, options = {}) {
  const url = `${process.env.EXPO_PUBLIC_BASE_URL}/${endpoint}`;
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
