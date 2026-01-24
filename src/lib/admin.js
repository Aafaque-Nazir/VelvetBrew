// Use environment variable for admin emails, fallback to hardcoded for safety only if env is missing
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'aafaquebuisness@gmail.com').split(',');

export function isAdmin(email) {
    if (!email) return false;
    return ADMIN_EMAILS.includes(email.trim());
}
