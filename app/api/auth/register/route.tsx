"use server";

import Users from "@/src/models/userModel";
import { hashSync } from "bcrypt-ts";

export const runtime = "edge";
export async function POST(req: Request) {
  const { email, password } = await req.json();
  // check unique email
  const findUser = await Users.findOne({ email });
  if (findUser) {
    return Response.json(
      {
        errors: {
          email: "Email already exists!",
        },
      },
      { status: 401 }
    );
  }

  const passwordHash = await hashSync(password, 12);
  const newUser = new Users({ email: email, password: passwordHash });
  await newUser.save();

  return Response.json({ user: newUser });
}
