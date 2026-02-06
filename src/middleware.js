import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// Hardcoded for middleware usage if env isn't picked up immediately, 
// though process.env should work. Matching lib/admin.js logic.
const ADMIN_EMAILS = [
    'aafaquebuisness@gmail.com'
];

export default withAuth(
  function middleware(req) {
    // Custom logic if needed, but the authorized callback handles the main check
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // 1. User must be logged in (token exists)
        if (!token) return false;

        // 2. User must be an admin
        const email = token.email;
        // Check both environment variable (if available in edge) and hardcoded fallbacks
        const envEmails = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',') : [];
        const allAdmins = [...ADMIN_EMAILS, ...envEmails];
        
        return allAdmins.some(admin => admin.trim() === email);
      },
    },
    pages: {
        signIn: '/login', // Redirect here if unauthorized
    }
  }
)

export const config = { matcher: ["/admin/:path*"] }
