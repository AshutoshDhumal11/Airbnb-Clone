import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, context: any) {
  const reservationId = context.params?.reservationId;

  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid Id");
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser.id },
        { listing: { userId: currentUser.id } },
      ],
    },
  });

  return NextResponse.json(reservation);
}
