export function getEventStatus(isoString) {
  const eventDate = new Date(isoString);
  const now = new Date();

  // Normalize times to midnight for comparisons
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());

  const msInDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.floor((eventDay - today) / msInDay);

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "tomorrow";

  // This week = within next 7 days
  if (diffDays > 1 && diffDays <= 7) return "this-week";

  return null;
}
