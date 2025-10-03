import { getListingById } from "@/app/actions/getListingById";
import { EmptyState } from "@/app/components/EmptyState";
import { ListingClient } from "./ListingClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getReservations } from "@/app/actions/getReservations";

export default async function Listing(props: any) {
  // Access params safely
  const listingId = props.params?.listingId as string;

  if (!listingId) {
    return <EmptyState />;
  }

  const listing = await getListingById({ listingId });
  const reservations = await getReservations({ listingId });
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <div className="">
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </div>
  );
}
