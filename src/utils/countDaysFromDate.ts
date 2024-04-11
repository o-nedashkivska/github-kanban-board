export const countDaysFromDate = (fromDate) => {
  const date = new Date(fromDate).getTime();
  const now = Date.now();

  const diff = now - date;

  const dayDiff = diff / (1000 * 60 * 60 * 24);

  return Math.round(dayDiff);
};
