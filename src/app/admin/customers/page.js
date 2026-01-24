"use client";
import React, { useState, useEffect } from 'react';
import { Search, Mail, MapPin } from 'lucide-react';

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // We can reuse the orders API to extract customers for now, or build a dedicated /api/admin/customers
        // For efficiency in this MVP, let's extract unique customers from orders logic on client or fetch aggregated
        // Actually best to create a dedicated API if we want scale, but fetching orders is fast for now.
        async function fetchCustomers() {
            try {
                const res = await fetch('/api/admin/orders');
                if (res.ok) {
                    const data = await res.json();
                    
                    // Group by email to find unique customers
                    const customerMap = new Map();
                    
                    data.forEach(order => {
                        if (!customerMap.has(order.userEmail)) {
                            customerMap.set(order.userEmail, {
                                email: order.userEmail,
                                totalSpent: 0,
                                orderCount: 0,
                                lastOrderDate: new Date(0),
                                address: order.shippingAddress 
                                    ? `${order.shippingAddress.address}, ${order.shippingAddress.city}` 
                                    : 'N/A'
                            });
                        }
                        
                        const customer = customerMap.get(order.userEmail);
                        customer.totalSpent += order.total;
                        customer.orderCount += 1;
                        if (new Date(order.createdAt) > customer.lastOrderDate) {
                            customer.lastOrderDate = new Date(order.createdAt);
                        }
                    });
                    
                    setCustomers(Array.from(customerMap.values()));
                }
            } catch (error) {
                console.error("Failed to customers");
            } finally {
                setLoading(false);
            }
        }
        fetchCustomers();
    }, []);

    return (
        <div>
             <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Customers</h1>
                <p className="text-white/40">Your valued customer base.</p>
            </div>

            <div className="bg-[#151515] border border-white/5 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-sm text-white/60">
                    <thead className="bg-white/5 text-white font-bold uppercase tracking-widest text-xs border-b border-white/5">
                        <tr>
                            <th className="p-4">Customer Email</th>
                            <th className="p-4">Location</th>
                            <th className="p-4">Total Orders</th>
                            <th className="p-4 text-right">Lifetime Value</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                             <tr><td colSpan="4" className="p-8 text-center">Loading...</td></tr>
                        ) : customers.length === 0 ? (
                             <tr><td colSpan="4" className="p-8 text-center">No customers yet.</td></tr>
                        ) : customers.map((customer, idx) => (
                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-bronze-500/20 flex items-center justify-center text-bronze-500">
                                            <Mail size={14} />
                                        </div>
                                        <span className="text-white font-medium">{customer.email}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                     <div className="flex items-center gap-2">
                                        <MapPin size={14} />
                                        <span>{customer.address}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="bg-white/10 px-2 py-1 rounded-md text-xs font-bold text-white">{customer.orderCount} Orders</span>
                                </td>
                                <td className="p-4 text-right">
                                    <span className="text-bronze-500 font-bold">₹{customer.totalSpent.toLocaleString('en-IN')}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
