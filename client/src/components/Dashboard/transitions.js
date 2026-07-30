// Valid transitions
export const transitions = {
  Saved: ["Applied"],
  Applied: ["Assessment", "Interviewing", "Not Selected"],
  Assessment: ["Interviewing", "Job Offer", "Not Selected"],
  Interviewing: ["Assessment", "Job Offer", "Not Selected"],
  "Job Offer": [],
  "Not Selected": []
};