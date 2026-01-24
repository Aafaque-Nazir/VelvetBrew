"use client";
import React, { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Printer, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function InvoicePage({ params }) {
  // In a real app, use the ID to fetch order details
  // const { id } = React.use(params); 
  
  // Mock Invoice Data
  const invoice = {
      id: '#VB-9281',
      date: 'January 24, 2026',
      dueDate: 'January 24, 2026',
      status: 'Paid',
      customer: {
          name: 'Aafaque Nazir',
          email: 'aafaquebusiness@gmail.com',
          address: '123, Coffee Estate Rd, Bangalore, KA 560001'
      },
      items: [
          { name: 'The Obsidian Project', qty: 1, price: 99999, total: 99999 },
          { name: 'Ethiopian Yirgacheffe (250g)', qty: 2, price: 1800, total: 3600 },
      ],
      subtotal: 103599,
      tax: 18647, // 18% GST estimate
      discount: 0,
      total: 122246 // sub + tax
  };

  const printInvoice = () => {
      window.print();
  }

  return (
    <div className="min-h-screen bg-[#0f0e0e] pt-24 pb-24 text-white">
        <div className="container mx-auto px-6 max-w-4xl">
            {/* Actions */}
            <div className="flex justify-between items-center mb-8 print:hidden">
                <Link href="/account" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                    <ArrowLeft size={18} /> Back to Orders
                </Link>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={printInvoice} className="gap-2">
                        <Printer size={18} /> Print
                    </Button>
                    <Button onClick={printInvoice} className="gap-2">
                        <Download size={18} /> Download PDF
                    </Button>
                </div>
            </div>

            {/* Invoice Card */}
            <div className="bg-white text-black p-12 md:p-16 rounded-sm shadow-2xl relative overflow-hidden print:shadow-none print:p-0">
                {/* Header */}
                <div className="flex justify-between items-start mb-16">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tighter mb-2">VELVET<span className="text-bronze-500">BREW</span></h1>
                        <p className="text-sm text-black/50">Premium Coffee Solutions</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-4xl font-light text-black/20 uppercase tracking-widest mb-4">Invoice</h2>
                        <p className="font-bold text-xl">{invoice.id}</p>
                        <p className="text-black/60">{invoice.date}</p>
                    </div>
                </div>

                {/* Addresses */}
                <div className="grid grid-cols-2 gap-12 mb-16">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4">Billed To</h3>
                        <p className="font-bold text-lg mb-1">{invoice.customer.name}</p>
                        <p className="text-black/60 mb-1">{invoice.customer.email}</p>
                        <p className="text-black/60 max-w-xs">{invoice.customer.address}</p>
                    </div>
                    <div className="text-right">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4">From</h3>
                        <p className="font-bold text-lg mb-1">VelvetBrew Inc.</p>
                        <p className="text-black/60 mb-1">hello@velvetbrew.com</p>
                        <p className="text-black/60">Maker Maxity, BKC, Mumbai 400051</p>
                        <p className="text-black/60">GSTIN: 27AABCU9603R1ZN</p>
                    </div>
                </div>

                {/* Items Table */}
                <div className="mb-12">
                    <div className="grid grid-cols-12 gap-4 border-b-2 border-black pb-4 mb-4 text-xs font-bold uppercase tracking-widest text-black/40">
                        <div className="col-span-6">Item Description</div>
                        <div className="col-span-2 text-center">Qty</div>
                        <div className="col-span-2 text-right">Price</div>
                        <div className="col-span-2 text-right">Total</div>
                    </div>

                    {invoice.items.map((item, idx) => (
                         <div key={idx} className="grid grid-cols-12 gap-4 py-4 border-b border-black/5 items-center">
                            <div className="col-span-6 font-medium">{item.name}</div>
                            <div className="col-span-2 text-center text-black/60">{item.qty}</div>
                            <div className="col-span-2 text-right text-black/60">₹{item.price.toLocaleString('en-IN')}</div>
                            <div className="col-span-2 text-right font-bold">₹{item.total.toLocaleString('en-IN')}</div>
                        </div>
                    ))}
                </div>

                {/* Totals */}
                <div className="flex justify-end mb-16">
                    <div className="w-64 space-y-3">
                        <div className="flex justify-between text-black/60">
                            <span>Subtotal</span>
                            <span>₹{invoice.subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-black/60">
                            <span>Tax (18%)</span>
                            <span>₹{invoice.tax.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="h-px bg-black/10 my-4" />
                        <div className="flex justify-between text-xl font-bold">
                            <span>Total</span>
                            <span className="text-bronze-500">₹{invoice.total.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-black/10 pt-8 text-center text-sm text-black/40">
                    <p className="mb-2">Thank you for your business.</p>
                    <p>Authorization Code: #VB-AUTH-8821 • payment verified via Credit Card</p>
                </div>

                {/* Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-bronze-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
            </div>
        </div>
    </div>
  );
}
