export const PORT = process.env.PORT || 3000;
export const base_url =
  process.env.VERCEL_ENV !== "production"
    ? `http://localhost:${process.env.PORT}`
    : process.env.VERCEL_URL;
