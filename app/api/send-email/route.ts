import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    console.log('📧 Email API called');
    
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const file = formData.get('file') as File | null;

    console.log('Form data received:', { name, email, subject, hasFile: !!file });

    // Validation
    if (!name || !email || !subject) {
      console.error('Missing required fields:', { name, email, subject });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('Invalid email format:', email);
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Get credentials from environment variables
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_PASSWORD;

    console.log('Checking credentials:', {
      hasUser: !!gmailUser,
      hasPassword: !!gmailPassword,
      user: gmailUser?.substring(0, 10) + '***',
    });

    if (!gmailUser || !gmailPassword) {
      console.error('❌ Missing Gmail credentials in environment variables');
      console.error('GMAIL_USER:', gmailUser);
      console.error('GMAIL_PASSWORD:', gmailPassword);
      return NextResponse.json(
        { error: 'Server configuration error - Missing credentials' },
        { status: 500 }
      );
    }

    console.log('✅ Credentials found, creating transporter...');

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    });

    // Verify connection
    console.log('Verifying transporter connection...');
    await transporter.verify();
    console.log('✅ Transporter verified successfully');

    // Prepare attachments
    const attachments = [];
    if (file) {
      const buffer = await file.arrayBuffer();
      attachments.push({
        filename: file.name,
        content: Buffer.from(buffer),
      });
      console.log('Attachment prepared:', file.name, file.size, 'bytes');
    }

    // Send email
    console.log('Sending email...');
    const result = await transporter.sendMail({
      from: gmailUser,
      to: email, // Send to the user-provided email address
      replyTo: email,
      subject: `${name} - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Message from ${name}</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>From Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <p style="color: #666; font-size: 12px;">This email was sent from your email sender form.</p>
        </div>
      `,
      attachments,
    });

    console.log('✅ Email sent successfully!', result.messageId);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Email sending error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error code:', (error as any).code);
      console.error('Error response:', (error as any).response);
    }
    return NextResponse.json(
      { error: `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
