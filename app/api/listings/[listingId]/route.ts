import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, context: any) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const listingId = context.params?.listingId;
  if (!listingId || typeof listingId !== "string") throw new Error("Invalid Id");

  await prisma.listing.delete({
    where: { id: listingId },
  });

  return NextResponse.json({ message: "Listing deleted successfully" });
}

export async function GET(req: NextRequest, context: any) {
  const listingId = context.params?.listingId;
  if (!listingId || typeof listingId !== "string") throw new Error("Invalid Id");

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
  });

  return NextResponse.json(listing);
}
