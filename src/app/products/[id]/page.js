import React from 'react';
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import ProductView from "@/components/product/ProductView";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProduct(id);
  
  if (!product) return { title: "Product Not Found" };
  
  return {
    title: `${product.name} | VelvetBrew`,
    description: product.description,
    openGraph: {
      images: [product.colors ? product.colors[0].image : product.image],
    },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) return notFound();

  return <ProductView product={product} />;
}
