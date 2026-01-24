import clientPromise from "@/lib/mongodb";

export async function getSystemSettings() {
    try {
        const client = await clientPromise;
        const db = client.db("velvetbrew");
        const settings = await db.collection("settings").findOne({ _id: 'global' });
        return settings || { maintenanceMode: false };
    } catch (e) {
        return { maintenanceMode: false };
    }
}
