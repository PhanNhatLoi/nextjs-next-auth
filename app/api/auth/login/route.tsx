"use server";
import clientPromise from "@/lib/mongodb";
import { compareSync } from "bcrypt-ts";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const client = await clientPromise;
    const db = client.db("shoesdb");
    const collection = db.collection("users");
    const user = await collection.findOne({ email });

    if (!user) {
      return Response.json(
        {
          errors: {
            email: "Email not found!",
          },
        },
        { status: 401 }
      );
    }
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
  } catch (error) {
    return Response.json(
      {
        errors: {
          email: "Server Error",
        },
      },
      { status: 401 }
    );
  }
}
