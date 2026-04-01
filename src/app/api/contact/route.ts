import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // --- INTEGRATION POINT ---
    // Here you would integrate with Resend, SendGrid, or another email provider.
    // Example with Resend (you need to npm install resend and add your RESEND_API_KEY):
    // 
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: 'jean2biolley@gmail.com',
    //   subject: `New Portfolio Contact from ${name}`,
    //   text: `From: ${name} (${email})\n\nMessage:\n${message}`,
    // });
    
    // For now, we simulate a successful email send
    console.log("=== New Contact Submission ===");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    console.log("==============================");

    // Artificial delay to simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
