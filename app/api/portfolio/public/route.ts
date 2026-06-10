import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Portfolio from "@/models/Portfolio";

export async function GET() {
  await dbConnect();

  const portfolios = await Portfolio.find({
    status: "published",
  });

  return NextResponse.json(portfolios);
}