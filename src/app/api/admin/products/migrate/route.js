import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { isAdmin } from "@/lib/admin";
import { products } from "@/lib/products";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !isAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("velvetbrew");
    const collection = db.collection("products");

    // Check if products already exist to avoid duplicates
    const count = await collection.countDocuments();
    
    if (count > 0) {
        return NextResponse.json({ message: 'Products already exist in DB', seeded: false });
    }

    // Insert all static products
    const result = await collection.insertMany(products.map(p => ({
        ...p,
        createdAt: new Date(),
        updatedAt: new Date()
    })));

    return NextResponse.json({ success: true, seeded: true, count: result.insertedCount });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
