import clientPromise from "@/lib/mongodb";
import InvoiceView from "@/components/account/InvoiceView";

export default async function InvoicePage({ params }) {
  const { id } = await params;
  
  // Fetch Order from DB
  let invoice = null;
  
  if (id === 'demo') {
      // Keep demo data for testing
      invoice = {
        id: '#VB-DEMO',
        date: new Date().toLocaleDateString(),
        dueDate: new Date().toLocaleDateString(),
        status: 'Paid',
        customer: { name: 'Demo User', email: 'demo@velvetbrew.com', address: 'Demo Address' },
        items: [{ name: 'Demo Product', qty: 1, price: 1000, total: 1000 }],
        subtotal: 1000, tax: 180, total: 1180
      };
  } else {
      try {
        const client = await clientPromise;
        const db = client.db("velvetbrew");
        // Try finding by custom string ID first, then ObjectId if needed
        const order = await db.collection("orders").findOne({ id: id });
        
        if (order) {
            invoice = {
                id: order.id,
                date: new Date(order.createdAt).toLocaleDateString(),
                dueDate: new Date(order.createdAt).toLocaleDateString(),
                status: 'Paid',
                customer: {
                    name: 'Valued Customer',
                    email: order.userEmail,
                    address: order.shippingAddress ? `${order.shippingAddress.address}, ${order.shippingAddress.city} ${order.shippingAddress.postalCode}` : 'N/A'
                },
                items: order.items.map(item => ({
                    name: item.name,
                    qty: item.quantity,
                    price: item.price,
                    total: item.price * item.quantity
                })),
                subtotal: order.total,
                tax: Math.round(order.total * 0.18),
                discount: 0,
                total: Math.round(order.total * 1.18)
            };
            // Retrospective adjustment for invoice math logic
            // Since Checkout saves 'total' (final), we reverse calculate subtotal/tax to make the invoice look math-correct
            invoice.total = order.total;
            invoice.subtotal = Math.round(order.total / 1.18);
            invoice.tax = order.total - invoice.subtotal;
        }
      } catch (e) {
          console.error("Invoice Fetch Error", e);
      }
  }

  if (!invoice) {
      return <div className="min-h-screen bg-black text-white flex items-center justify-center">Invoice Not Found</div>
  }

  return <InvoiceView invoice={invoice} />;
}
