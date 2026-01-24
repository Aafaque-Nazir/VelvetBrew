import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("velvetbrew"); // Uses default DB from URI if not specified, or "velvetbrew"

    // Fetch orders for the logged-in user email
    const orders = await db.collection("orders")
      .find({ userEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(orders);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const client = await clientPromise;
    const db = client.db("velvetbrew");

    const newOrder = {
        ...data,
        userEmail: session.user.email,
        createdAt: new Date(),
        status: 'Processing',
        id: `#VB-${Math.floor(1000 + Math.random() * 9000)}` // Simple ID generation
    };

    const result = await db.collection("orders").insertOne(newOrder);

    return NextResponse.json({ success: true, orderId: newOrder.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
