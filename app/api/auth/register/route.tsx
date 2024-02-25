"use server";
import clientPromise from "@/lib/mongodb";
import { hashSync } from "bcrypt-ts";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    // check unique email
    const client = await clientPromise;
    const db = client.db("shoesdb");
    const collection = db.collection("users");
    const user = await collection.findOne({ email });
    if (user) {
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
    const newUser = {
      email: email,
      password: passwordHash,
    };
    await collection.insertOne(newUser);
    return Response.json({ user: newUser });
  } catch (error) {
    return Response.json(
      {
        errors: {
          error: error,
        },
      },
      { status: 500 }
    );
  }
}
