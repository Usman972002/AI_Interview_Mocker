"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const path = usePathname();
  const router = useRouter();

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image
        src={"/logo.svg"}
        width={120}
        height={70}
        alt="logo"
        onClick={() => router.push("/")}
        className="cursor-pointer"
      />
      <ul className="hidden md:flex gap-6">
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path == "/dashboard" && "text-primary font-bold"}
                `}
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path == "/questions" && "text-primary font-bold"}
                `}
          onClick={() => router.push("/questions")}
        >
          Questions
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path == "/upgrade" && "text-primary font-bold"}
                `}
                onClick={() => router.push("/upgrade")}
        >
          Upgrade
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path == "/howitworks" && "text-primary font-bold"}
                `}
                onClick={() => router.push("/howitworks")}
        >
          How it Works?
        </li>
      </ul>
      <UserButton />
    </div>
  );
};

export default Header;
