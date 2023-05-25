import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const host = headersList.get("host");

    const body = await request.json();
    console.log(body);
    const { email } = body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return new NextResponse("User not found", { status: 400 });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // token expires in 1 hour

    await prisma.user.update({
      where: { email },
      data: {
        passwordResetToken: token,
        passwordResetTokenExpiresAt: expiresAt,
      },
    });

    const resetUrl = `${host}/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kliang.dev@gmail.com",
        pass: process.env.MAILER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"Synergize.ai" <no-reply@synergize.ai>', // sender address
      to: email, // list of receivers
      subject: "Password Reset", // Subject line
      html: `
      <!DOCTYPE html>
<html>

<head>
  <style>
    body, td, div, h1, p, a {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    }
    p {
      color: #000;
      font-size: 14px;
      line-height: 24px;
    }
    h1 {
      color: #000;
      font-size: 24px;
      font-weight: normal;
      margin: 30px 0;
      padding: 0;
    }
    .block-button--solid {
      background-color: #000;
      border-radius: 5px;
      color: #fff;
      display: inline-block;
      font-size: 12px;
      font-weight: 500;
      line-height: 50px;
      text-align: center;
      text-decoration: none;
      width: 200px;
    }
    strong {
      color: #000;
      font-weight: bold;
    }
    a {
      color: #067df7;
      text-decoration: none;
    }
  </style>
</head>

<body>
<table style="width:100%; border: 0; cellpadding: 0; cellspacing: 0;">
<tr>
  <td align="center">
<table width="600" border="0" cellspacing="0" cellpadding="40" style="border:1px solid #eaeaea;border-radius:5px;margin:40px 0">
<tr>
  <td align="center">
    <img src="https://synergize-ai.vercel.app/_next/image?url=%2Fimages%2Flogo.png&w=48&q=75" alt="Logo" />
    <h1>Reset your password</h1>
    <p>You have requested a password reset.</p>
    <p>Click the button below to reset your password</p>
    <table align="center" border="0" cellspacing="0" cellpadding="0">
    <tr>
        <td>
            <a href="${resetUrl}" style="background-color: #000; border-radius: 5px; color: #fff; display: inline-block; font-size: 12px; font-weight: 500; line-height: 50px; text-align: center; text-decoration: none; width: 200px;" target="_blank">Reset Password</a>
        </td>
    </tr>
</table>    <hr style="border:none; border-top:1px solid #eaeaea; margin:26px 0;width:100%" />
    <p>© 2023 Synergize.ai. All rights reserved. - <a href="https://synergize-ai.vercel.app/" target="_blank">synergize-ai.vercel.app</a></p>
    <p><a href="https://www.privacypolicies.com/generic/" target="_blank">Privacy Policy</a></p>
  </td>
</tr>
</table>
</td>
</tr>
</body>

</html>
  `, // HTML body // plain text body
    });

    return NextResponse.json("Password reset email sent", { status: 200 });
  } catch (error: any) {
    console.log(error, "FORGOT_PASSWORD_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
