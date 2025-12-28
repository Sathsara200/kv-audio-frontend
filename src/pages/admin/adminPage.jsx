import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineReviews, MdOutlineSpeaker } from "react-icons/md";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { LuFileSearch2 } from "react-icons/lu";
import { TfiGallery } from "react-icons/tfi";
import { HiMenu, HiX } from "react-icons/hi";

import AdminItemsPage from "./adminItemsPage";
import UpdateItemPage from "./updateItemPage";
import AddItemPage from "./addItemPage";
import AdminUsersPage from "./adminUsersPage";
import AdminOrdersPage from "./adminBookingPage";
import AdminReviewPage from "./adminReveiwPage";
import AdminInquiryPage from "./adminInquiryPage";
import AdminGalleryPage from "./adminGalleryPage";
import AdminAddGalleryPage from "./adminAddGallery";

export default function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.role === "admin") setUserValidated(true);
        else window.location.href = "/";
      })
      .catch(() => setUserValidated(false));
  }, []);

  const menuItems = [
    { path: "/admin/orders", icon: <FaRegBookmark />, label: "Orders" },
    { path: "/admin/items", icon: <MdOutlineSpeaker />, label: "Items" },
    { path: "/admin/users", icon: <FaRegUser />, label: "Users" },
    { path: "/admin/reveiws", icon: <MdOutlineReviews />, label: "Reviews" },
    { path: "/admin/inquiries", icon: <LuFileSearch2 />, label: "Inquiries" },
    { path: "/admin/gallery", icon: <TfiGallery />, label: "Gallery" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 font-bold">
          <BsGraphDown />
          Dashboard
        </div>
        <button onClick={() => setSidebarOpen(true)}>
          <HiMenu size={26} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-40 h-full bg-gray-900 text-white
        w-[260px] md:w-[220px]
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Mobile Sidebar Header */}
        <div className="flex md:hidden items-center justify-between px-4 py-4 border-b border-gray-700">
          <div className="flex items-center gap-2 text-lg font-bold">
            <BsGraphDown />
            Dashboard
          </div>
          <button onClick={() => setSidebarOpen(false)}>
            <HiX size={22} />
          </button>
        </div>

        {/* Desktop Sidebar Header */}
        <div className="hidden md:block px-4 py-6 text-center text-2xl font-bold border-b border-gray-700">
          <BsGraphDown className="inline-block mr-2" />
          Dashboard
        </div>

        {/* Navigation */}
        <nav className="mt-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-4 py-2.5 text-base md:text-lg transition-colors
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-4 text-center text-sm text-gray-400 border-t border-gray-700">
          Admin Panel © {new Date().getFullYear()}
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 mt-14 md:mt-0">
        {userValidated && (
          <Routes>
            <Route path="/orders" element={<AdminOrdersPage />} />
            <Route path="/users" element={<AdminUsersPage />} />
            <Route path="/reveiws" element={<AdminReviewPage />} />
            <Route path="/inquiries" element={<AdminInquiryPage />} />
            <Route path="/gallery" element={<AdminGalleryPage />} />
            <Route path="/gallery/add" element={<AdminAddGalleryPage />} />
            <Route path="/items" element={<AdminItemsPage />} />
            <Route path="/items/add" element={<AddItemPage />} />
            <Route path="/items/edit" element={<UpdateItemPage />} />
          </Routes>
        )}
      </div>
    </div>
  );
}
