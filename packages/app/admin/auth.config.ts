import NextAuth, { NextAuthResult } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "@my-own-blog/db";
import type { NextAuthConfig } from "next-auth";
import { signOut } from "./auth";

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const [email, password] = [
          credentials["email"] as string,
          credentials["password"] as string,
        ];
        // 로그인 정보 검증 후 일치하면 사용자 반환
        if (
          email === process.env.ADMIN_EMAIL &&
          password === process.env.ADMIN_PASSWORD
        )
          return {
            email,
            password,
          };
        else return null;
      },
    }),
  ],
  session: {
    strategy: "jwt", // JSON Web Token 사용
    maxAge: 60 * 60 * 24, // 세션 만료 시간(sec)
  },
  pages: {
    signIn: "/signin", // Default: '/auth/signin'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnSignInPage = nextUrl.pathname.startsWith("/signin");
      console.log("loggedin: ", isLoggedIn);
      if (isOnSignInPage) {
        signOut();
      } else {
        return isLoggedIn;
      }
    },
  },
} satisfies NextAuthConfig;
