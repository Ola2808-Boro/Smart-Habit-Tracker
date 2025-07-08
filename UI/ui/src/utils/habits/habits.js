export function convertPythonTimeToInputTime(pythonTimeStr) {
  const [hours, minutes] = pythonTimeStr.split(":");
  const pad = (num) => String(num).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}`;
}

export async function setNewDate(arrow, newDate, months) {
  if (arrow === "right") {
    newDate.setDate(newDate.getDate() + 1);
  } else {
    newDate.setDate(newDate.getDate() - 1);
  }
  const newSelectedDate = `${
    months[newDate.getMonth()]
  } ${newDate.getDate()},${newDate.getFullYear()}`;
  return newSelectedDate;
}

export async function validateDate(selectedDateRef, months) {
  if (
    selectedDateRef.current !==
    `${
      months[new Date().getMonth()]
    } ${new Date().getDate()},${new Date().getFullYear()}`
  ) {
    return true;
  } else {
    return false;
  }
}
