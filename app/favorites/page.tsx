import getCurrentUser from "../actions/getCurrentUser";
import { getFavoriteListing } from "../actions/getFavoriteListings";
import { EmptyState } from "../components/EmptyState";
import { FavoritesClient } from "./FavoritesClient";

export default async function Favorites() {
  const listings = await getFavoriteListing();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  // FavoritesClient is a client component
  return <FavoritesClient listings={listings} currentUser={currentUser} />;
}
