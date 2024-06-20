export const pdfName = (input: string): string => {
  const regex = /-(.*\.pdf)$/;
  const match = input.match(regex);
  if (match && match[1]) {
    return match[1];
  }
  return "";
};

export const timestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return date.toLocaleString("en-US", options);
};
