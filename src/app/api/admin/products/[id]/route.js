import { NextResponse } from 'next/server';
import clientPromise from "@/lib/mongodb";
import { validateAdminRequest } from "@/lib/admin";
import { ObjectId } from "mongodb";

export async function PUT(request, { params }) {
  try {
    const adminValidation = await validateAdminRequest();
    if (!adminValidation.success) {
        return adminValidation.response;
    }
    
    const { id } = await params;
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db("velvetbrew");

    // Remove _id from data if present to avoid immutable field error
    delete data._id;

    // Try update by custom id first, then ObjectId
    let result = await db.collection("products").updateOne(
        { id: id },
        { $set: { ...data, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
        try {
             result = await db.collection("products").updateOne(
                { _id: new ObjectId(id) },
                { $set: { ...data, updatedAt: new Date() } }
            );
        } catch(e) {}
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const adminValidation = await validateAdminRequest();
    if (!adminValidation.success) {
        return adminValidation.response;
    }
    
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db("velvetbrew");

    let result = await db.collection("products").deleteOne({ id: id });

    if (result.deletedCount === 0) {
         try {
            result = await db.collection("products").deleteOne({ _id: new ObjectId(id) });
         } catch(e) {}
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
