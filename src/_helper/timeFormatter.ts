export const timeFormatter = (dateTime: Date | string) => {
  return new Date(dateTime).toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "Asia/Jakarta",
  });
};
