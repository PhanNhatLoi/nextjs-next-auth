export const PORT = process.env.PORT || 3000;
export const base_url =
  process.env.NODE_ENV === "production"
    ? "https://nextjs-next-auth-tau.vercel.app"
    : `http://localhost:${PORT}`;
