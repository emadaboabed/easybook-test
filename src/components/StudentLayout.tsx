// src/components/StudentLayout.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "devextreme-react";
import { logout } from "@/services/auth";
import LogoutConfirmationModal from "@/components/LogoutConfirmationModal";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [language, setLanguage] = useState("English");

  const handleLogoutClick = () => setLogoutModalVisible(true);
  const cancelLogout = () => setLogoutModalVisible(false);
  const handleLogout = () => {
    logout();
    setLogoutModalVisible(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 w-[250px] bg-white border-r border-[#e8e8e8] transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-[250px] md:min-w-[250px] md:flex md:flex-col">
        <div className="p-6 border-b border-[#e8e8e8] flex items-center h-[14vh] gap-3">
          <Image
            className="ml-3"
            src="/logo.svg"
            alt="logo"
            width={24}
            height={24}
          />
          <span>Logo</span>
        </div>
        <nav className="flex-1 mt-5">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#edf4fe] text-blue-700 border-l-4 border-blue-500 h-14">
            <Image src="/student.svg" alt="Students" width={24} height={24} />
            <span>Students' Data</span>
          </div>
        </nav>

        <div className="p-4 border-t border-[#e8e8e8]">
          <Button
            className="w-full flex items-center justify-center gap-3 px-4 py-3 hover:bg-gray-50"
            onClick={handleLogoutClick}
          >
            <Image src="/logout.svg" alt="Logout" width={24} height={24} />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50 w-full md:pl-0">
        <header className="w-full h-[72px] bg-white border-b border-[#e8e8e8] flex items-center justify-end px-8 sticky top-0 z-10">
          <div className="flex items-end justify-end gap-4 me-7">
            <div className="flex items-end gap-2">
              <span className="text-gray-600 hidden sm:inline mb-2.5">
                {typeof window !== "undefined" &&
                  localStorage.getItem("user_name")}
              </span>
              <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                <Image
                  src="/avatar.svg"
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-md"
                />
              </div>
              <Button
                className="!px-4"
                onClick={() =>
                  setLanguage(language === "English" ? "Arabic" : "English")
                }
              >
                <Image
                  src="/language.svg"
                  alt="Language"
                  width={24}
                  height={24}
                />
                <span>{language}</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 bg-[#f3f6f9]">{children}</main>
      </div>

      <LogoutConfirmationModal
        visible={logoutModalVisible}
        onHide={cancelLogout}
        onConfirm={handleLogout}
      />
    </div>
  );
}
