import clientPromise from "@/lib/mongodb";
import { unstable_cache } from "next/cache";

/*
 * Fetches system settings with aggressive caching.
 * Revalidates every 5 minutes (300 seconds) or when 'settings' tag is invalidated.
 */
export const getSystemSettings = unstable_cache(
    async () => {
        try {
            const client = await clientPromise;
            const db = client.db("velvetbrew");
            const settings = await db.collection("settings").findOne({ _id: 'global' });
            // Plain object required for server components/cache serialization
            return settings ? JSON.parse(JSON.stringify(settings)) : { maintenanceMode: false };
        } catch (e) {
            console.error("Failed to fetch settings:", e);
            return { maintenanceMode: false };
        }
    },
    ['system-settings'], 
    { 
        revalidate: 300, 
        tags: ['settings'] 
    }
);
