export const PORT = process.env.PORT;
export const base_url =
  process.env.NODE_ENV === "production"
    ? process.env.base_url
    : `http://localhost:${PORT}`;
