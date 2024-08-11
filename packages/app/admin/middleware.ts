import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  res.headers.set('x-pathname', request.nextUrl.pathname);
  return res;
}
