"use server";

import Users from "@/src/models/userModel";

export async function POST(req: Request) {
  return Response.json({ msg: "success" });
}

export async function GET(req: Request) {
  const users = await Users.find({});
  return Response.json({ users: users });
}
