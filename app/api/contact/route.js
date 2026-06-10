import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();

    if (!data.token) {
      return Response.json(
        { success: false, message: "Captcha token missing" },
        { status: 400 }
      );
    }

    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY || "",
          response: data.token,
        }),
      }
    );

    const captchaData = await verifyRes.json();

    console.log("captchaData:", captchaData);

    if (!captchaData.success) {
      return Response.json(
        {
          success: false,
          message: "Captcha verification failed",
          errorCodes: captchaData["error-codes"],
        },
        { status: 400 }
      );
    }

    if (captchaData.score !== undefined && captchaData.score < 0.3) {
      return Response.json(
        {
          success: false,
          message: "Captcha score too low",
          score: captchaData.score,
        },
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
      subject: `Contact Form - ${data.services || "New Enquiry"}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${data.fullName}</p>
        <p><b>Company:</b> ${data.company}</p>
        <p><b>Phone:</b> ${data.phone}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Service:</b> ${data.services}</p>
        <p><b>Message:</b> ${data.message}</p>
      `,
    });

    return Response.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Contact API Error:", error);

    return Response.json(
      { success: false, message: "Email send failed" },
      { status: 500 }
    );
  }
}