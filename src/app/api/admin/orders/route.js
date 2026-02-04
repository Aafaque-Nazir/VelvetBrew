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

    const orders = await db.collection("orders")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(orders);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
