import { NextResponse, type NextRequest } from "next/server";
import { isAuthorized, unauthorized } from "@/app/lib/admin-auth";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
  type BlogPostInput,
} from "@/app/lib/db";

export async function GET(request: NextRequest) {
  if (!(await isAuthorized(request))) return unauthorized();
  const posts = await getAllPosts();
  return NextResponse.json({ success: true, posts });
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized(request))) return unauthorized();
  try {
    const body = (await request.json()) as BlogPostInput;
    const id = await createPost(body);
    if (id === null) {
      return NextResponse.json(
        { success: false, message: "create failed" },
        { status: 500 },
      );
    }
    return NextResponse.json({ success: true, id });
  } catch {
    return NextResponse.json(
      { success: false, message: "invalid request" },
      { status: 400 },
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthorized(request))) return unauthorized();
  try {
    const body = (await request.json()) as { id?: number } & BlogPostInput;
    if (!body.id) {
      return NextResponse.json(
        { success: false, message: "id required" },
        { status: 400 },
      );
    }
    const { id, ...input } = body;
    const ok = await updatePost(id, input);
    return NextResponse.json({ success: ok });
  } catch {
    return NextResponse.json(
      { success: false, message: "invalid request" },
      { status: 400 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthorized(request))) return unauthorized();
  try {
    const body = (await request.json()) as { id?: number };
    if (!body.id) {
      return NextResponse.json(
        { success: false, message: "id required" },
        { status: 400 },
      );
    }
    const ok = await deletePost(body.id);
    return NextResponse.json({ success: ok });
  } catch {
    return NextResponse.json(
      { success: false, message: "invalid request" },
      { status: 400 },
    );
  }
}
