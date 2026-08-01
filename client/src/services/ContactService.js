const BASE_URL = import.meta.env.VITE_API_URL || "";

// Load Contacts
export async function loadContacts() {
  const url = `${BASE_URL}/api/contacts`
  const response = await fetch(url, {
    method: "GET",
    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
  });

  if (response.ok) {
    const data = await response.json()
    return data.contacts
  }
  throw new Error(`retrievng contacts: ${response.statusText}`);
  return null
}

// Add Contacts
export async function addContact(newContactData) {
  if (newContactData) {
    const url = `${BASE_URL}/api/contacts`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(newContactData)
    });
    if (response.ok) {
      const data = await response.json()
      return data
    }
    throw new Error(`adding new contact: ${response.statusText}`);
    return null
  }
}

// Update contact
export async function updateContact(id, contactData) {
  if (id) {
    const url = `${BASE_URL}/api/contacts/${id}`
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(contactData)
    })
    if (response.ok) {
      const data = await response.json();
      return data
    }
    throw new Error(`updating contact: ${response.statusText}`);
    return null
  }
}

// Delete contact
export async function deleteContact(id) {
  if (id) {
    const url = `${BASE_URL}/api/contacts/${id}`
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`        
      }
    });
    if (response.ok) {
      console.log(response.statusText)
      return null
    }
    throw new Error(`deleting contact: ${response.statusText}`);
    return null
  }
}