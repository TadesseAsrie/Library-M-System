// src/utils/helpers.js
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + "...";
};

export const getStatusColor = (status) => {
  const colors = {
    Available: "green",
    Borrowed: "red",
    Active: "green",
    Inactive: "gray",
    Returned: "blue",
  };
  return colors[status] || "gray";
};
