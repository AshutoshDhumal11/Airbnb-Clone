import getCurrentUser from "../actions/getCurrentUser";
import { getReservations } from "../actions/getReservations";
import { EmptyState } from "../components/EmptyState";
import { ReservationsClient } from "./ReservationsClient";

export default async function Reservations() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  // Reservations made on our property
  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations found on your property!"
      />
    );
  }

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
}
