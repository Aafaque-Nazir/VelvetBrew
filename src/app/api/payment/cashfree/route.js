import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import crypto from 'crypto';

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();
        const { order_amount, customer_phone } = data;

        const isProd = process.env.CASHFREE_ENV === 'PRODUCTION';
        const baseUrl = isProd ? 'https://api.cashfree.com/pg' : 'https://sandbox.cashfree.com/pg';

        const order_id = `VB-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const payload = {
            order_amount: order_amount,
            order_currency: "INR",
            order_id: order_id,
            customer_details: {
                customer_id: crypto.randomBytes(8).toString('hex'),
                customer_name: session.user.name,
                customer_email: session.user.email,
                customer_phone: customer_phone || "9999999999"
            },
            order_meta: {
                // If using seamless frontend callbacks, this shouldn't be fully needed, but is good practice.
                return_url: `${process.env.NEXTAUTH_URL}/checkout?cf_success=true&order_id={order_id}`,
            }
        };

        const response = await fetch(`${baseUrl}/orders`, {
            method: 'POST',
            headers: {
                'x-app-id': process.env.CASHFREE_APP_ID || '',
                'x-client-id': process.env.CASHFREE_APP_ID || '',
                'x-client-secret': process.env.CASHFREE_SECRET_KEY || '',
                'x-api-version': '2023-08-01',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            return NextResponse.json({ payment_session_id: result.payment_session_id, cf_order_id: order_id });
        } else {
            console.error("Cashfree API Error:", result);
            return NextResponse.json({ error: 'Failed to create Cashfree session', details: result }, { status: 500 });
        }
    } catch (error) {
        console.error("Cashfree SDK Route Error:", error);
         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
