function EventBadge({ status }) {
  const styles = {
    today: "bg-red-100 text-red-700 border-red-300",
    tomorrow: "bg-blue-100 text-blue-700 border-blue-300",
    "this-week": "bg-green-100 text-green-700 border-green-300",
  };

  const labels = {
    today: "Today",
    tomorrow: "Tomorrow",
    "this-week": "This Week",
  };

  if (!status) return null;

  return (
    <span
      className={`inline-block text-xs font-medium px-2 py-1 rounded border ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

export default EventBadge;