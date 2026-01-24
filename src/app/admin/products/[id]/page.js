import React from 'react';
import ProductForm from '@/components/admin/ProductForm';
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function EditProductPage({ params }) {
    const { id } = await params;
    
    // Fetch product data
    const client = await clientPromise;
    const db = client.db("velvetbrew");
    
    // Try find by id string first
    let product = await db.collection("products").findOne({ id: id });
    
    if (!product) {
         try {
            product = await db.collection("products").findOne({ _id: new ObjectId(id) });
         } catch(e) {}
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    // Serialize _id
    product._id = product._id.toString();

    return (
        <div>
            <ProductForm initialData={product} />
        </div>
    )
}
