import getCurrentUser from "../actions/getCurrentUser";
import { getReservations } from "../actions/getReservations";
import { EmptyState } from "../components/EmptyState";
import { ReservationsClient } from "./ReservationsClient";
import { Suspense } from "react";

export default async function Reservations() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

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
    <Suspense fallback={
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading reservations...</div>
      </div>
    }>
      <ReservationsClient reservations={reservations} currentUser={currentUser} />
    </Suspense>
  );
}