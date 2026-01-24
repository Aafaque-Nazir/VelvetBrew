import React from 'react';
import { notFound } from "next/navimport React from 'react';
import { getProductBySlug } from '@/lib/dbProducts';
import ProductView from '@/components/product/ProductView';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const product = await getProductBySlug(id);
    return {
        title: product ? `${product.name} | VelvetBrew` : 'Product Not Found',
        description: product?.tagline || 'Premium Coffee Gear',
    }
}

export default async function ProductPage({ params }) {
    const { id } = await params;
    const product = await getProductBySlug(id);

    if (!product) return <div className="text-white text-center pt-40">Product Not Found</div>;

    return <ProductView product={product} />;
}
