import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await dbConnect();

  const { slug } = await params;

  const blog = await Blog.findOne({
    slug,
    status: "published",
  });

  if (!blog) {
    return NextResponse.json(
      { error: "Blog nahi mila" },
      { status: 404 }
    );
  }

  return NextResponse.json(blog);
}