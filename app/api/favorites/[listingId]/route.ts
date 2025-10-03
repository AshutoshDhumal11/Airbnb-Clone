import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, context: any) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const listingId = context.params?.listingId;
  if (!listingId || typeof listingId !== "string") throw new Error("Invalid Id");

  const favoriteIds = [...(currentUser.favoriteIds || []), listingId];

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds },
  });

  return NextResponse.json(user);
}

export async function DELETE(req: NextRequest, context: any) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const listingId = context.params?.listingId;
  if (!listingId || typeof listingId !== "string") throw new Error("Invalid Id");

  const favoriteIds = (currentUser.favoriteIds || []).filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds },
  });

  return NextResponse.json(user);
}
