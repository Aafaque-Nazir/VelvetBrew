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
      strategy: "jwt", // We Keep JWT for easier session handling on client, but adapter persists user
  },
  callbacks: {
    async session({ session, token, user }) {
        if (token && session.user) {
            session.user.id = token.sub;
        }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_dev",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
