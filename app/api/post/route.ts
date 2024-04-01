import db from 'db';
import { NextResponse } from 'next/server';

export async function GET() {
  const post = await db.post.findFirst({ where: { id: 2 } });
  console.log(post);
  post?.delete();
  return NextResponse.json({deleted: true})
}
