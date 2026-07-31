const BASE_URL = import.meta.env.VITE_API_URL || "";

// Load events
export async function loadEvents() {
  const url = `${BASE_URL}/api/events`
  const response = await fetch(url, {
    method: "GET",
    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
  });

  if (response.ok) {
    const data = await response.json()
    return data.events
  }
  throw new Error(`retrieving events: ${response.statusText}`)
  return null
}

// Add event
export async function addEvent(newEventdata) {
  if (newEventdata) {
    const url = `${BASE_URL}/api/events`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(newEventdata)
    });
    if (response.ok) {
      const data = await response.json();
      return data
    }
    throw new Error(`adding new event ${response.statusText}`);
    return null
  }
}

// Update event
export async function updateEvent(id, eventData) {
  if (id) {
    const url = `${BASE_URL}/api/events/${id}`
    const response =  await fetch(url, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(eventData)
    })
    if (response.ok) {
      const data = await response.json();
      return data
    }
    throw new Error(`updating event: ${response.statusText}`);
    return null
  }
}

// Delete event
export async function deleteEvent(id) {
  if (id) {
    const url = `${BASE_URL}/apt/events/${id}`
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`        
      }
    })
    if (response.ok) {
      console.log(response.statusText)
      return null
    }
    throw new Error(`deleting event:  ${response.statusText}`);
    return null
  }
}