import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Contact from '@/models/Contact';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    await dbConnect();
    const { name, email, message, subject } = await req.json();

    // 1. Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please maintain required fields.' },
        { status: 400 }
      );
    }

    // 2. Save to Database (Reliable Source of Truth)
    await Contact.create({ name, email, message, subject: subject || 'New Inquiry' });

    // 3. Send Email (Best Effort)
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER, // Sender Email
                pass: process.env.GMAIL_APP_PASSWORD, // Sender App Password
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER, // sender address
            to: 'aafaquebuisness@gmail.com', // Receiver address (Hardcoded as requested)
            subject: `New Concierge Inquiry: ${subject || 'General Info'}`,
            html: `
                <div style="font-family: sans-serif; color: #333;">
                    <h2>New Message from VelvetBrew Website</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <hr />
                    <p><strong>Message:</strong></p>
                    <p style="background: #f4f4f4; padding: 15px; border-left: 4px solid #d97706;">${message}</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to aafaquebuisness@gmail.com");

    } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // We do NOT fail the request if email fails, because we saved to DB.
        // But we might want to log it clearly.
    }

    return NextResponse.json({ success: true, message: 'Message received.' });

  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server caught an error.' },
      { status: 500 }
    );
  }
}
