const BASE_URL = import.meta.env.VITE_API_URL || "";

// Load events
export async function loadevents() {
  const url = `${BASE_URL}/events`

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
    const events = data.events
    return events

  } catch (error) {
    console.error("Event request error: "), error
    return null
  }
}

// Add event

// Update event

// Delete event

