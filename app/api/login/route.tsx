"use server";
import Users from "@/src/models/userModel";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

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
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return Response.json({ msg: "login success" }, { status: 200 });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return Response.json({ msg: "password wrong!" });
        default:
          return Response.json({ msg: "Something went wrong!" });
      }
    }

    throw error;
  }
}
