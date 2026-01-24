import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { isAdmin } from "@/lib/admin";

export async function GET(request) {
  try {
    // This API handles ADMIN requests for list. 
    const session = await getServerSession(authOptions);
    // const isUserAdmin = session && isAdmin(session.user.email); // Can add stricter check if needed
    
    const client = await clientPromise;
    const db = client.db("velvetbrew");
    
    const products = await db.collection("products").find({}).toArray();

    return NextResponse.json(products);
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

    const result = await db.collection("products").insertOne({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (e) {
     console.error(e);
     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
