const BASE_URL = import.meta.env.VITE_API_URL || "";

// Load jobs
export async function loadJobs() {
  const url = `${BASE_URL}/api/jobs`

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
    const jobs = data.jobs
    return jobs

  } catch (error) {
    console.error("Job request error: ", error)
    return null
  }
}

// Add job

// Update job

// Delete job

