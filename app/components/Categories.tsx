"use client";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { Container } from "./Container";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { usePathname, useSearchParams } from "next/navigation";
import { CategoryBox } from "./CategoryBox";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { Suspense } from "react";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on as island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property is has skiing activities!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This propery is in a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This propery has camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This propery is an arctic!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This propery is in a cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This propery is in the desert!",
  },
  {
    label: "Barn",
    icon: GiBarn,
    description: "This propery is in the barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This propery is luxurious!",
  },
];

function CategoriesContent() {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex items-center justify-between overflow-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            description={item.description}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}

export function Categories() {
  return (
    <Suspense fallback={
      <Container>
        <div className="pt-4 flex items-center justify-between overflow-auto">
          {categories.map((item) => (
            <div key={item.label} className="flex flex-col items-center justify-center gap-2 p-3">
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </Container>
    }>
      <CategoriesContent />
    </Suspense>
  );
}