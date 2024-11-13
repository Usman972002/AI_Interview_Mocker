// "use client";
// import { UserButton } from "@clerk/nextjs";
// import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";
// import React from "react";

// const Header = () => {
//   const path = usePathname();
//   const router = useRouter();

//   return (
//     <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
//       <Image
//         src={"/logo.svg"}
//         width={120}
//         height={70}
//         alt="logo"
//         onClick={() => router.push("/")}
//         className="cursor-pointer"
//       />
//       <ul className="hidden md:flex gap-6">
//         <li
//           className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//                 ${path == "/dashboard" && "text-primary font-bold"}
//                 `}
//           onClick={() => router.push("/dashboard")}
//         >
//           Dashboard
//         </li>
//         <li
//           className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//                 ${path == "/questions" && "text-primary font-bold"}
//                 `}
//           onClick={() => router.push("/questions")}
//         >
//           Questions
//         </li>
//         <li
//           className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//                 ${path == "/upgrade" && "text-primary font-bold"}
//                 `}
//                 onClick={() => router.push("/upgrade")}
//         >
//           Upgrade
//         </li>
//         <li
//           className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//                 ${path == "/howitworks" && "text-primary font-bold"}
//                 `}
//                 onClick={() => router.push("/howitworks")}
//         >
//           How it Works?
//         </li>
//       </ul>
//       <UserButton />
//     </div>
//   );
// };

// export default Header;


"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();

  const handleToggle = () => setMenuOpen(!menuOpen);
  const handleNavClick = (route) => {
    setMenuOpen(false);
    router.push(route);
  };

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
      
      {/* Menu button for small screens */}
      <div className="md:hidden cursor-pointer" onClick={handleToggle}>
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </div>
      
      {/* Desktop menu and mobile menu */}
      <ul
        className={`flex flex-col md:flex-row gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-secondary md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 transition-all duration-300 ease-in-out
          ${menuOpen ? "block" : "hidden md:flex"}`}
      >
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path === "/dashboard" ? "text-primary font-bold" : ""}
                `}
          onClick={() => handleNavClick("/dashboard")}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path === "/questions" ? "text-primary font-bold" : ""}
                `}
          onClick={() => handleNavClick("/questions")}
        >
          Questions
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path === "/upgrade" ? "text-primary font-bold" : ""}
                `}
          onClick={() => handleNavClick("/upgrade")}
        >
          Upgrade
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path === "/howitworks" ? "text-primary font-bold" : ""}
                `}
          onClick={() => handleNavClick("/howitworks")}
        >
          How it Works?
        </li>
      </ul>
      
      <UserButton />
    </div>
  );
};

export default Header;