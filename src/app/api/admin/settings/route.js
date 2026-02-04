import { NextResponse } from 'next/server';
import clientPromise from "@/lib/mongodb";
import { validateAdminRequest } from "@/lib/admin";

export async function GET(request) {
  try {
    // Public endpoint for checking status? No, admin only for fetching ALL settings.
    // But layout uses internal helper. 
    // Let's make this Admin only.
    const adminValidation = await validateAdminRequest();
    if (!adminValidation.success) {
        return adminValidation.response;
    }

    const client = await clientPromise;
    const db = client.db("velvetbrew");
    const settings = await db.collection("settings").findOne({ _id: 'global' });

    return NextResponse.json(settings || { maintenanceMode: false });
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const adminValidation = await validateAdminRequest();
    if (!adminValidation.success) {
        return adminValidation.response;
    }

    const data = await request.json();
    const client = await clientPromise;
    const db = client.db("velvetbrew");

    await db.collection("settings").updateOne(
        { _id: 'global' },
        { $set: { ...data, updatedAt: new Date() } },
        { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
