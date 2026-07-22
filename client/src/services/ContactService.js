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

    if (!response.ok) {
      console.error(`GET request failed at ${ url }. Response: ${ response.status }`)
      return null
    }

    const data = await response.json()
    const contacts = data.contacts
    return contacts

  } catch (error) {
    console.error("Event request error: ", error)
    return null
  }
}