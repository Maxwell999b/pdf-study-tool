// src/components/Layout.tsx
import React from "react";
import Sidebar from "./Sidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4 md:p-6 lg:p-8">{children}</main>
    </div>
  );
};

export default Layout;
