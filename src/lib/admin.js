// Use environment variable for admin emails, fallback to hardcoded for safety only if env is missing
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'aafaquebuisness@gmail.com').split(',');

export function isAdmin(email) {
    if (!email) return false;
    return ADMIN_EMAILS.includes(email.trim());
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * Validates if the current request is from an admin.
 * Returns { success: true } if admin, or { success: false, response: NextResponse } if not.
 */
export async function validateAdminRequest() {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !isAdmin(session.user.email)) {
        return { 
            success: false, 
            response: Response.json({ error: "Unauthorized" }, { status: 401 }) 
        };
    }
    
    return { success: true };
}
