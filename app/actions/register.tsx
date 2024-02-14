import FETCH from "@/src/utils/Fetch";

export const registerApi = (body: { email: string; password: string }) =>
  FETCH({ method: "POST", path: "/api/register", body: body });
