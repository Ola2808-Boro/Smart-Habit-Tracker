export function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const nameOfDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
