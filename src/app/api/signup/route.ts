import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import clientPromise from "@/lib/mongodb";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("reformify"); // your database name
    const collection = db.collection("waitlist");

    // Check if email already exists
    const existingEmail = await collection.findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Store email in MongoDB
    await collection.insertOne({
      email,
      signupDate: new Date(),
    });

    // Send welcome email
    const msg = {
      to: email,
      from: "noreply@reformify.com",
      subject: "Welcome to Reformify!",
      text: "Thank you for joining the Reformify waitlist! We'll keep you updated on our launch.",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <img src="https://utfs.io/f/STFL4gpOFkcntBKcL5dVbQDo8T7RmK6aH09S5z4fXAqCGNPB" alt="Reformify Logo" style="width: 64px; margin: 20px auto; display: block;">
          <h1 style="text-align: center; color: #333;">Welcome to Reformify!</h1>
          <p style="color: #666; line-height: 1.6;">
            Thank you for joining our waitlist! We're excited to have you on board.
            We'll keep you updated on our progress and let you know as soon as we launch.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Best regards,<br>
            The Reformify Team
          </p>
        </div>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json(
      { message: "Successfully signed up for waitlist" },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error:", error?.response?.body || error);
    return NextResponse.json(
      { error: "Failed to process signup" },
      { status: 500 }
    );
  }
}
