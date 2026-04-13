import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const authorization = req.headers.get("Authorization") ?? "";

  const res = await fetch(
    "https://tfnahoarhmhwgzyrraw72bgfsm0dcpcz.lambda-url.us-east-1.on.aws/",
    {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        ...(authorization && { Authorization: authorization }),
      },
      body: JSON.stringify({}),
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
