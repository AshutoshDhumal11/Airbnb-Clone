"use client";

import { SafeUser } from "@/app/types";
import { Container } from "../Container";
import { Logo } from "./Logo";
import { Search } from "./Search";
import { UserMenu } from "./UserMenu";
import { Categories } from "../Categories";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

export function Navbar({ currentUser }: NavbarProps) {
  return (
    <div className="fixed w-full bg-white shadow-sm">
      <div className="py-4 border-b-[1px] border-neutral-300">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-2">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
}
