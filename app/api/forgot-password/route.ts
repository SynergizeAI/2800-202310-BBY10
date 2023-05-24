import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
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

    const resetUrl = `http://localhost:3000//reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kliang.dev@gmail.com",
        pass: process.env.MAILER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"No reply" <no-reply@synergize.ai>', // sender address
      to: email, // list of receivers
      subject: "Password Reset", // Subject line
      text: `Please follow this link to reset your password: ${resetUrl}`, // plain text body
    });

    return NextResponse.json("Password reset email sent", { status: 200 });
  } catch (error: any) {
    console.log(error, "FORGOT_PASSWORD_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
