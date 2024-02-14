import FETCH from "@/src/utils/Fetch";

export const loginApi = (body: { email: string; password: string }) =>
  FETCH({ method: "POST", path: "/api/login", body: body });
