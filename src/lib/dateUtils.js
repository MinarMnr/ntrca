export const dateFormatter = (date, format) => {
  const d = new Date(date);
  const year = d.getFullYear();
  let month =
    "" + format !== "dd-MMM-YYYY" &&
    format !== "MMM-YYYY" &&
    format !== "dd-MMM-YYYY HH:mm:ss"
      ? d.getMonth() + 1
      : d.getMonth();
  let day = "" + d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if ((format === "YYYY-mm-dd" && month.toString().length < 2) || !format)
    month = "0" + month;
  if (day.length < 2) day = "0" + day;
  switch (format) {
    case "dd-MMM-YYYY":
      return [day, months[month], year].join("-");
    case "MMM-YYYY":
      return [months[month], year].join("-");
    case "YYYY-mm-dd":
      return [year, month, day].join("-");
    case "dd-MMM-YYYY HH:mm:ss":
      return (
        [day, months[month], year].join("-") +
        " " +
        [hours, minutes, seconds].join(":")
      );
    default:
      return [day, month, year].join("-");
  }
};
