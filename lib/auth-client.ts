import { createAuthClient } from "better-auth/react";
export const { signIn, signUp, useSession, signOut, user } = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL, // the base url of your auth server
});