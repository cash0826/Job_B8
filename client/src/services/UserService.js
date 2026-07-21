// Already in proxy
const BASE_URL = `http://localhost:5555`;

// Get JWT Token
export async function getJWTUserId() {
  const url = `${BASE_URL}/checkjwtid`

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })

    if (!response.ok) {
      console.error(`GET request failed at ${ url }. Response: ${ response.status }`)
      return null
    }
    const data = await response.json();
    return data.user

  } catch (error) {
    console.error("User request error: ", error)
    return null
  }
}

// LOGIN
export async function userLogin(userData) {
  const url = `${BASE_URL}/login`

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      console.error(`POST request failed at ${url}. Response: ${ response.status }`)
      return null
    }

    const data = await response.json()

    // Store token to frontend
    if (data.token) {
      localStorage.setItem("token", data.token)
    }

    return data; // contains token + user info

  } catch (error) {
    console.error("Login request error: ", error)
    return null
  }
}

// Logout is handled by deleting localStorage token
// Pending Signup ... Should we develop?