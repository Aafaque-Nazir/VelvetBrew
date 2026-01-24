"use client";
import React, { useState, useEffect } from 'react';

// Actually user asked for "real hi rkh" (keep it real).
// Let's stick to the cards first.

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalRevenue: 0,
        activeOrders: 0,
        totalCustomers: 0,
        totalOrders: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch('/api/admin/stats');
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to fetch stats");
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-white/40">Real-time overview of your business.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard 
                    title="Total Revenue" 
                    value={`₹${stats.totalRevenue.toLocaleString('en-IN')}`} 
                    subtext="Lifetime earnings"
                />
                <StatCard 
                    title="Active Orders" 
                    value={stats.activeOrders} 
                    subtext="Processing or Shipped"
                />
                <StatCard 
                    title="Unique Customers" 
                    value={stats.totalCustomers} 
                    subtext="Across all orders"
                />
            </div>

            <div className="p-12 bg-[#151515] rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center min-h-[300px]">
                <h3 className="text-xl font-bold text-white mb-2">Analytics Engine</h3>
                <p className="text-white/40 max-w-md">
                    Real-time data collection is active. As your store grows, detailed sales charts and conversion metrics will appear here automatically.
                </p>
            </div>
        </div>
    )
}

function StatCard({ title, value, subtext }) {
    return (
        <div className="bg-[#151515] border border-white/5 p-6 rounded-2xl">
            <h3 className="text-white/40 text-sm font-bold uppercase tracking-widest mb-2">{title}</h3>
            <div className="flex flex-col">
                <div className="text-3xl font-bold text-white mb-1">{value}</div>
                <div className="text-white/20 text-xs font-medium">{subtext}</div>
            </div>
        </div>
    )
}
