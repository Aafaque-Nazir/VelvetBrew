import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: '/login', 
  },
  session: {
      strategy: "jwt",
  },
  callbacks: {
    async session({ session, token, user }) {
        if (token && session.user) {
            session.user.id = token.sub;
        }
      return session;
    },
  },
  logger: {
    error(code, metadata) {
      // Suppress noisy client-side fetch errors in console
      if (code === "CLIENT_FETCH_ERROR") return;
      console.error("[NextAuth Error]", code, metadata);
    },
    warn(code) {
      // Suppress warnings in dev
    },
    debug(code, metadata) {
      // Silent debug
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_dev",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
