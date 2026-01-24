import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "../../auth/[...nextauth]/route";
import { isAdmin } from "@/lib/admin";

export async function GET(request) {
  try {
    // Public endpoint for checking status? No, admin only for fetching ALL settings.
    // But layout uses internal helper. 
    // Let's make this Admin only.
    const session = await getServerSession(authOptions);
    if (!session || !isAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
    const session = await getServerSession(authOptions);
    if (!session || !isAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
