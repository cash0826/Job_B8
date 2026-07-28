const BASE_URL = import.meta.env.VITE_API_URL || "";

// Load (get) jobs
export async function loadJobs() {
  const url = `${BASE_URL}/api/jobs`
  const response = await fetch(url, {
    method: "GET",
    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
  });

  if (response.ok) {
    const data = await response.json()
    return data.jobs
  }
  throw new Error(`retrieving jobs: ${response.statusText}`);
  return null
}

// Add job
export async function addJob(newJobData) {
  if (newJobData) {
    const url = `${BASE_URL}/api/jobs`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(newJobData)
    });
    if (response.ok) {
      const data = await response.json();
      return data
    }
    throw new Error(`adding new job: ${response.statusText}`);
    return null
  }
}

// Update job
export async function updateJob(id, jobData) {
  if (id) {
    const url = `${BASE_URL}/api/jobs/${id}`
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(jobData)
    });
    if (response.ok) {
      const data = await response.json();
      return data
    }
    throw new Error(`updating job: ${response.statusText}`);
    return null
  }
}

// Delete job
export async function deleteJob(id) {
  if (id) {
    const url = `${BASE_URL}/api/jobs/${id}`
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
    throw new Error(`deleting job: ${response.statusText}`);
    return null
  }
}