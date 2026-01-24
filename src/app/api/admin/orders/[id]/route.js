import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { isAdmin } from "@/lib/admin";
import { ObjectId } from "mongodb";

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    if (!session || !isAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { status } = data;

    const client = await clientPromise;
    const db = client.db("velvetbrew");

    // Try to update by 'id' string field first (our customs IDs #VB...)
    let result = await db.collection("orders").updateOne(
        { id: id },
        { $set: { status: status, updatedAt: new Date() } }
    );

    // If no match, try ObjectId (fallback)
    if (result.matchedCount === 0) {
        try {
            result = await db.collection("orders").updateOne(
                { _id: new ObjectId(id) },
                { $set: { status: status, updatedAt: new Date() } }
            );
        } catch (e) {
            // ignore ObjectId error
        }
    }

    return NextResponse.json({ success: true, matched: result.matchedCount });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
