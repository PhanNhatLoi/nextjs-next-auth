"use server";

export async function POST(req: Request) {
  return Response.json({ msg: "success" });
}

export async function GET(req: Request) {
  return Response.json({ msg: "success" });
}
