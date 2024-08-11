import NextAuth, { NextAuthResult } from "next-auth";
import { authConfig } from "auth.config";

const nextAuthResult = NextAuth(authConfig);

export const auth: NextAuthResult["auth"] = nextAuthResult.auth;
export const {
  handlers,
  signIn,
  signOut,
}: NextAuthResult = nextAuthResult;
