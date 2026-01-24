"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/admin/orders');
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id, newStatus) => {
        // Optimistic update
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));

        try {
             await fetch(`/api/admin/orders/${id}`, {
                 method: 'PUT',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({ status: newStatus })
             });
        } catch (error) {
             console.error("Failed to update status");
             fetchOrders(); // Revert
        }
    }

    return (
        <div>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Order Management</h1>
                    <p className="text-white/40">Manage and track customer orders.</p>
                </div>
                <Button onClick={fetchOrders} variant="outline" size="sm">Refresh Data</Button>
            </div>

            <div className="bg-[#151515] border border-white/5 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-sm text-white/60">
                    <thead className="bg-white/5 text-white font-bold uppercase tracking-widest text-xs border-b border-white/5">
                        <tr>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr><td colSpan="6" className="p-8 text-center">Loading Orders...</td></tr>
                        ) : orders.length === 0 ? (
                            <tr><td colSpan="6" className="p-8 text-center">No orders found.</td></tr>
                        ) : orders.map(order => (
                            <tr key={order._id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-medium text-white">{order.id}</td>
                                <td className="p-4">{order.userEmail}</td>
                                <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="p-4 text-white">₹{order.total.toLocaleString('en-IN')}</td>
                                <td className="p-4">
                                     <StatusBadge status={order.status} />
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <select 
                                        className="bg-black border border-white/20 rounded-md px-2 py-1 text-xs text-white focus:border-bronze-500 outline-none"
                                        value={order.status}
                                        onChange={(e) => updateStatus(order.id, e.target.value)}
                                    >
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function StatusBadge({ status }) {
    const styles = {
        Processing: 'bg-blue-500/20 text-blue-500',
        Shipped: 'bg-yellow-500/20 text-yellow-500',
        Delivered: 'bg-green-500/20 text-green-500',
        Cancelled: 'bg-red-500/20 text-red-500'
    };

    const icons = {
        Processing: <Clock size={12} />,
        Shipped: <Truck size={12} />,
        Delivered: <CheckCircle size={12} />,
        Cancelled: <XCircle size={12} />
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${styles[status] || styles.Processing}`}>
            {icons[status] || icons.Processing}
            {status}
        </span>
    )
}
