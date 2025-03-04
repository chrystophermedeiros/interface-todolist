export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("pt-br", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
