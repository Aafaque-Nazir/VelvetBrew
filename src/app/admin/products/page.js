"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash, Database, Search } from 'lucide-react';
import Link from 'next/link';

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [seeding, setSeeding] = useState(false);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/admin/products');
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (error) {
            console.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSeed = async () => {
        if (!confirm("This will import products from the static file to the database. Continue?")) return;
        setSeeding(true);
        try {
            const res = await fetch('/api/admin/products/migrate', { method: 'POST' });
            const data = await res.json();
            if (data.seeded) {
                alert(`Successfully seeded ${data.count} products!`);
                fetchProducts();
            } else {
                alert(data.message || "Migration failed");
            }
        } catch (e) {
            alert("Migration error");
        } finally {
            setSeeding(false);
        }
    }

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
            setProducts(products.filter(p => p.id !== id && p._id !== id));
        } catch (e) {
            alert("Failed to delete");
        }
    }

    const machines = products.filter(p => p.category === 'machines');
    const accessories = products.filter(p => p.category === 'accessories');
    const beans = products.filter(p => p.category === 'beans');

    return (
        <div>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Products</h1>
                    <p className="text-white/40">Manage your catalog.</p>
                </div>
                <div className="flex gap-4">
                     {products.length === 0 && (
                        <Button variant="outline" onClick={handleSeed} disabled={seeding} className="gap-2">
                             <Database size={18} /> {seeding ? 'Seeding...' : 'Seed Database'}
                        </Button>
                     )}
                    <Link href="/admin/products/new">
                        <Button className="gap-2">
                            <Plus size={18} /> Add Product
                        </Button>
                    </Link>
                </div>
            </div>

            {loading ? (
                <div className="text-center p-12 text-white/40">Loading...</div>
            ) : products.length === 0 ? (
                <div className="text-center p-12 text-white/40 border border-white/5 rounded-2xl">
                    No products found. Seed the database to get started.
                </div>
            ) : (
                <div className="space-y-12">
                    <ProductTable title="Machines" products={machines} handleDelete={handleDelete} />
                    <ProductTable title="Accessories" products={accessories} handleDelete={handleDelete} />
                    <ProductTable title="Beans" products={beans} handleDelete={handleDelete} />
                </div>
            )}
        </div>
    )
}

function ProductTable({ title, products, handleDelete }) {
    if (products.length === 0) return null;

    return (
        <div className="bg-[#151515] border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-4 bg-white/5 border-b border-white/5 flex items-center gap-2">
                <h3 className="font-bold text-white uppercase tracking-widest text-sm">{title}</h3>
                <span className="text-xs text-white/40 bg-black/40 px-2 py-0.5 rounded-full">{products.length}</span>
            </div>
            <table className="w-full text-left text-sm text-white/60">
                <thead className="text-white/40 font-bold uppercase tracking-widest text-xs border-b border-white/5">
                    <tr>
                        <th className="p-4 w-24">Image</th>
                        <th className="p-4">Name</th>
                        <th className="p-4">Price</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {products.map((product) => (
                        <tr key={product._id || product.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4">
                                <div className="w-12 h-12 bg-white/5 rounded-lg overflow-hidden flex items-center justify-center">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img 
                                        src={product.image || (product.gallery && product.gallery[0]) || (product.colors && product.colors[0]?.image)} 
                                        alt="" 
                                        className="w-full h-full object-cover"
                                        />
                                </div>
                            </td>
                            <td className="p-4 font-bold text-white">{product.name}</td>
                            <td className="p-4 text-bronze-500 font-bold">₹{product.price?.toLocaleString('en-IN')}</td>
                            <td className="p-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <Link href={`/admin/products/${product.id || product._id}`}>
                                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-transparent hover:border-white/20">
                                            <Edit size={14} />
                                        </Button>
                                    </Link>
                                    <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="h-8 w-8 p-0 border-transparent hover:border-red-500/50 hover:text-red-500"
                                        onClick={() => handleDelete(product.id || product._id)}
                                    >
                                        <Trash size={14} />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
