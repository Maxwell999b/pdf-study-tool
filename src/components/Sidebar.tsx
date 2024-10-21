"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "PDF Reader", path: "/pdf-reader" },
    { name: "Notes", path: "/notes" },
    { name: "Exam", path: "/exam" },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        {navItems.map((item) => (
          <Link href={item.path} key={item.name}>
            <span
              className={`block py-2.5 px-4 rounded transition duration-200 ${
                pathname === item.path ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
              }`}>
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
