export const months = [
  "Januar",
  "Februar",
  "Marts",
  "April",
  "Maj",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "December",
];

export const getChangeInPercentage = (
  value: number,
  oldValue: number
): string => {
  if (oldValue === 0) return (value * 100).toFixed(0);

  const pct = (((value - oldValue) / oldValue) * 100).toFixed(0);

  if (value < oldValue) return (-pct).toFixed(0);
  return pct;
};
