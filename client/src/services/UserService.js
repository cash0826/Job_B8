const BASE_URL = import.meta.env.VITE_API_URL || "";

// Get JWT Token
export async function getJWTUserId() {
  const url = `${BASE_URL}/api/checkjwtid`
  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  })
  if (response.ok) {
    const data = await response.json()
    return data
  }
  throw new Error(`getting user id: ${response.statusText}`);
  return null
}

// LOGIN
export async function userLogin(userData) {

  if (userData) {
    const url = `${BASE_URL}/api/login`
    const response = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(userData)
    })
    if (response.ok) {
      const data = await response.json()
      if (data.token) {
        localStorage.setItem("token", data.token)
      }
      return data
    }
    throw new Error(`user login: ${response.statusText}`);
    return null
  }
}

// Logout is handled by deleting localStorage token
// Pending Signup ... 