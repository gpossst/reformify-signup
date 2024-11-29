import sgMail from "@sendgrid/mail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

    const msg = {
      to: email,
      from: "Reformify <noreply@reformify.dev>",
      subject: "Welcome to Reformify's Waitlist!",
      text: `Thanks for joining the Reformify waitlist!

We're excited to have you on board. You'll be among the first to know when we launch and get early access to our form management platform.

While you wait, feel free to follow our progress or reach out with any questions.

Best regards,
The Reformify Team`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ef6461;">Welcome to Reformify's Waitlist!</h1>
          
          <p>Thanks for joining the Reformify waitlist!</p>
          
          <p>We're excited to have you on board. You'll be among the first to know when we launch and get early access to our form management platform.</p>
          
          <p>While you wait, feel free to follow our progress or reach out with any questions.</p>
          
          <p>Best regards,<br>The Reformify Team</p>
        </div>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
