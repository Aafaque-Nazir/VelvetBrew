import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "../../auth/[...nextauth]/route";
import { isAdmin } from "@/lib/admin";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !isAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("velvetbrew");

    // 1. Total Revenue & Orders
    const orders = await db.collection("orders").find({}).toArray();
    
    // Calculate Stats
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    
    // 2. Unique Customers
    const uniqueCustomers = new Set(orders.map(o => o.userEmail)).size;

    // 3. Active Orders (Processing or Shipped)
    const activeOrders = orders.filter(o => ['Processing', 'Shipped'].includes(o.status)).length;

    return NextResponse.json({
        totalRevenue: totalRevenue,
        totalOrders: totalOrders,
        totalCustomers: uniqueCustomers,
        activeOrders: activeOrders
    });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
