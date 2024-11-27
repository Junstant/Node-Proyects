// ^ --------> Get the actual date in the format "day month year, hour:minutes AM/PM"
const getFormattedDate = () => {
  const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: true };
  const date = new Date();
  return date.toLocaleString("en-GB", options).replace(",", "");
};

export default getFormattedDate;
