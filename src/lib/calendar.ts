export function getCalendarUrl(
  title: string,
  startDate: Date,
  duration: number
): string {
  const start = startDate.toISOString().replace(/-|:|\.\d+/g, "");
  const end = new Date(startDate.getTime() + duration * 1000)
    .toISOString()
    .replace(/-|:|\.\d+/g, "");
  return `https://calendar.google.com/calendar/u/0/r/eventedit?dates=${start}/${end}&text=${title}`;
}
