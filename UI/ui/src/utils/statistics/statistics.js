export function parseDurationToMinutes(durationStr) {
  const hourMatch = durationStr.match(/(\d+)\s*h/);
  const minMatch = durationStr.match(/(\d+)\s*min/);
  const secMatch = durationStr.match(/(\d+)\s*s/);

  const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
  const minutes = minMatch ? parseInt(minMatch[1], 10) : 0;
  const seconds = secMatch ? parseInt(secMatch[1], 10) : 0;

  const totalMinutes = hours * 60 + minutes + seconds / 60;

  return parseFloat(totalMinutes.toFixed(2));
}
