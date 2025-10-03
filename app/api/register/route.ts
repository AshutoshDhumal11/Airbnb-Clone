import bcrypt from "bcryptjs";
import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    request: NextRequest
) {
    const body = await request.json();
    const { email, name, password } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    });

    return NextResponse.json(user);
}