// Already in proxy
const BASE_URL = `http://localhost:5555`;

// Load events
export async function loadevents() {
  const url = "/events"

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (!response.ok) {
      console.error(`GET request failed at ${ url }. Response: ${ response.status}`)
      return null
    }

    const data = await response.json()
    return data

  } catch (error) {
    console.error("Event request error: "), error
    return null
  }
}

// Add event

// Update event

// Delete event

