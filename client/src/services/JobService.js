// Already in proxy
const BASE_URL = `http://localhost:5555`;

// Load jobs
export async function loadJobs() {
  const url = "/jobs"

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (!response.ok) {
      console.error(`GET request failed at ${url}. Response: ${ response.status}`)
      return null
    }

    const data = await response.json()
    return data

  } catch (error) {
    console.error("Job request error: ", error)
    return null
  }
}

// Add job

// Update job

// Delete job

