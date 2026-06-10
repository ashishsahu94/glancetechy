import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Portfolio from "@/models/Portfolio";

export async function GET() {
  try {
    await dbConnect();

    const portfolios = await Portfolio.find({
      status: "published",
    }).sort({ createdAt: -1 });

    return NextResponse.json(portfolios);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch portfolios" },
      { status: 500 }
    );
  }
}