import { NextResponse } from "next/server";

export async function GET() {
  const countKey = "jvmpolytechnic_ac_in/website_views"; // ✅ no dots
  try {
    const res = await fetch(`https://api.countapi.xyz/hit/${countKey}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("CountAPI error:", err);
    return NextResponse.json({ value: 0 });
  }
}
