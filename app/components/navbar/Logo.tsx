"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export function Logo() {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/")}
      alt="Logo"
      src="/images/logo.png"
      className="hidden md:block cursor-pointer h-auto w-auto"
      height={100}
      width={100}
      priority
    />
  );
}
