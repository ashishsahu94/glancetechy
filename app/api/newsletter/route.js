import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"GlanceTechy Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Newsletter Subscription",
      html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
      `,
    });

    return Response.json({
      success: true,
      message: "Subscribed successfully",
    });
  } catch (error) {
    console.error("Newsletter Error:", error);

    return Response.json(
      { success: false, message: "Email send failed" },
      { status: 500 }
    );
  }
}