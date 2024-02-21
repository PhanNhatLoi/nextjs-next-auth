"use server";
import Users from "@/src/models/userModel";
import { compareSync } from "bcrypt-ts";

export const config = {
  runtime: "edge",
};

export async function POST(req: Request) {
  const { email, password } = await req.json();
  // check unique email
  const findUser = await Users.findOne({ email });
  if (!findUser) {
    return Response.json(
      {
        errors: {
          email: "Email not found!",
        },
      },
      { status: 401 }
    );
  }
  const user = await Users.findOne({ email: email || "" });
  const isMatch = await compareSync(password.toString(), user.password);
  if (!isMatch)
    return Response.json(
      {
        errors: {
          password: "password wrong!",
        },
      },
      { status: 401 }
    );
  return Response.json(
    {
      user: user,
    },
    { status: 200 }
  );
}
