import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET() {
  try {
    const analyticsData = google.analyticsdata("v1beta");

    const jwt = new google.auth.JWT({
      email: process.env.GA_CLIENT_EMAIL,
      key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
    });

    // Fetch total users (unique visitors)
    const res = await analyticsData.properties.runReport({
      auth: jwt,
      property: `properties/${process.env.GA_VIEW_ID}`,
      requestBody: {
        dateRanges: [{ startDate: "2024-01-01", endDate: "today" }],
        metrics: [{ name: "totalUsers" }],
      },
    });

    const totalUsers = res.data.rows?.[0]?.metricValues?.[0]?.value || "0";

    return NextResponse.json({ totalUsers });
  } catch (error) {
    console.error("GA Error:", error);
    return NextResponse.json({ error: "Failed to fetch GA data" }, { status: 500 });
  }
}
