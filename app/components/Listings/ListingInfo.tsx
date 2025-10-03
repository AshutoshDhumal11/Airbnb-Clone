import { useCountries } from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import { Avatar } from "../Avatar";
import { ListingCategory } from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map").then((mod) => mod.Map), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser | null;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

export function ListingInfo({
  user,
  category,
  description,
  roomCount,
  bathroomCount,
  guestCount,
  locationValue,
}: ListingInfoProps) {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr className="text-neutral-300" />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr className="text-neutral-300" />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr className="text-neutral-300" />
      <Map center={coordinates} />
    </div>
  );
}
