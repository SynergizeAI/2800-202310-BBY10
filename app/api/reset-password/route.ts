import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { token, newPassword } = body;
    console.log(body);

    const user = await prisma.user.findFirst({
      where: { passwordResetToken: token },
    });

    if (
      !user ||
      user.passwordResetToken !== token ||
      user.passwordResetTokenExpiresAt! < new Date()
    ) {
      return new NextResponse("Invalid token", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (!user || !user.email) {
      return new NextResponse("User not found", { status: 400 });
    } else {
      await prisma.user.update({
        where: { email: user.email },
        data: {
          hashedPassword,
          passwordResetToken: null,
          passwordResetTokenExpiresAt: null,
        },
      });
    }

    return NextResponse.json("Password reset successful", { status: 200 });
  } catch (error: any) {
    console.log(error, "RESET_PASSWORD_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
