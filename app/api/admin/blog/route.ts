import { NextRequest, NextResponse } from 'next/server';
import { createPost, getAllPosts, updatePost, deletePost } from '@/app/lib/blog-db';

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get('authorization');
  if (!auth) return false;
  const base64 = auth.replace('Basic ', '');
  const decoded = Buffer.from(base64, 'base64').toString();
  return decoded === 'admin:admin';
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const posts = getAllPosts();
  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const id = createPost(body);
  return NextResponse.json({ success: true, id });
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { id, ...data } = body;
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  updatePost(id, data);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  deletePost(id);
  return NextResponse.json({ success: true });
}
