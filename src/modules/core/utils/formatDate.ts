function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const dateFormatter = new Intl.DateTimeFormat("es-ES", options);
  return dateFormatter.format(date);
}

export { formatDate }
