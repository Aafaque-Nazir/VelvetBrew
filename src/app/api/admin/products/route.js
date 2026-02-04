import { NextResponse } from 'next/server';
import clientPromise from "@/lib/mongodb";
import { validateAdminRequest } from "@/lib/admin";

export async function GET(request) {
  try {
    const adminValidation = await validateAdminRequest();
    if (!adminValidation.success) {
        return adminValidation.response;
    }
    
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
    const adminValidation = await validateAdminRequest();
    if (!adminValidation.success) {
        return adminValidation.response;
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
