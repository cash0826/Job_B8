const BASE_URL = import.meta.env.VITE_API_URL || "";

// Load Contacts
export async function loadContacts() {
  const url = `${BASE_URL}/contacts`

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (!reponse.ok) {
      console.error(`GET request failed at ${ url }. Response: ${ response.status }`)
      return null
    }

    const data = response.json()
    return data

  } catch (error) {
    console.error("Event request error: ", error)
    return null
  }
}