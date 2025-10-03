"use client";

import { useRouter } from "next/navigation";
import { Container } from "../components/Container";
import { Heading } from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState, Suspense } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ListingCard } from "../components/Listings/ListingCard";

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

// Create a safe wrapper for ListingCard
function SafeListingCard({ 
  reservation, 
  onCancel, 
  deletingId, 
  currentUser 
}: { 
  reservation: SafeReservation; 
  onCancel: (id: string) => void; 
  deletingId: string; 
  currentUser?: SafeUser | null; 
}) {
  return (
    <Suspense fallback={<div className="animate-pulse bg-gray-200 rounded-xl h-[200px]"></div>}>
      <ListingCard
        key={reservation.id}
        data={reservation.listing}
        reservation={reservation}
        actionId={reservation.id}
        onAction={onCancel}
        disabled={deletingId === reservation.id}
        actionLabel="Cancel guest reservation"
        currentUser={currentUser}
      />
    </Suspense>
  );
}

export function ReservationsClient({
  reservations,
  currentUser,
}: ReservationsClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <SafeListingCard
            key={reservation.id}
            reservation={reservation}
            onCancel={onCancel}
            deletingId={deletingId}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}