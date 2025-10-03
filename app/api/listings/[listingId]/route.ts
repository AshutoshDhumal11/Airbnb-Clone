import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
    listingId: string;
}

export async function DELETE(request: NextRequest, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = (await params);

    if (!listingId) {
        throw new Error("Invalid Id");
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing);
}