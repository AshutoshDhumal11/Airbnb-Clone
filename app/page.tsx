import getCurrentUser from "./actions/getCurrentUser";
import { getListings } from "./actions/getListings";
import { Container } from "./components/Container";
import { EmptyState } from "./components/EmptyState";
import { ListingCard } from "./components/Listings/ListingCard";

export default async function Home(props: any) {
  const searchParams = props.searchParams;

  // Convert searchParams to the expected format
  const listingParams = {
    userId: searchParams?.userId as string,
    guestCount: searchParams?.guestCount ? parseInt(searchParams.guestCount as string) : undefined,
    roomCount: searchParams?.roomCount ? parseInt(searchParams.roomCount as string) : undefined,
    bathroomCount: searchParams?.bathroomCount ? parseInt(searchParams.bathroomCount as string) : undefined,
    startDate: searchParams?.startDate as string,
    endDate: searchParams?.endDate as string,
    locationValue: searchParams?.locationValue as string,
    category: searchParams?.category as string,
  };

  const listings = await getListings(listingParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
}