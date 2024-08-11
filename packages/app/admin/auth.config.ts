import NextAuth, { NextAuthResult } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "@my-own-blog/db";
import type { NextAuthConfig } from "next-auth";
import { signOut } from "./auth";
import { emit } from "process";

export const authConfig = {
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          // 로그인 정보 검증 후 일치하면 사용자 반환
          if (
            credentials.email === process.env.ADMIN_EMAIL &&
            credentials.password === process.env.ADMIN_PASSWORD
          )
            return {
              email: `${credentials.email}`,
              isAdmin: true,
            };
          else return null;
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // JSON Web Token 사용
    maxAge: 60 * 60 * 24 * 5, // 세션 만료 시간(sec)
  },
  pages: {
    signIn: "/signin", // Default: '/auth/signin'
  },
} satisfies NextAuthConfig;
