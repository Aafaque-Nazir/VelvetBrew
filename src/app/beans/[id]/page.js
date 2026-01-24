import React from 'react';
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import SimpleProductView from "@/components/product/SimpleProductView";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Not Found" };
  return { title: `${product.name} | Beans` };
}

export default async function BeanPage({ params }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return notFound();

  return <SimpleProductView product={product} />;
}
