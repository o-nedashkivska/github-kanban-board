const countDaysFromDate = (fromDate) => {
  const date = new Date(fromDate).getTime();
  const now = Date.now();

  const diff = now - date;

  const dayDiff = diff / (1000 * 60 * 60 * 24);

  return Math.round(dayDiff);
};

export const formatCreatedAt = (createdAt) => {
  const activeTime = countDaysFromDate(createdAt);

  if (!activeTime) return "opened today";

  return `opened ${activeTime} day ${activeTime === 1 ? "" : "s"} ago`;
};
