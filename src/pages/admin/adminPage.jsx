import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineReviews, MdOutlineSpeaker } from "react-icons/md";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import AdminItemsPage from "./adminItemsPage";
import UpdateItemPage from "./updateItemPage";
import AddItemPage from "./addItemPage";
import AdminUsersPage from "./adminUsersPage";
import AdminOrdersPage from "./adminBookingPage";
import AdminReviewPage from "./adminReveiwPage";
import AdminInquiryPage from "./adminInquiryPage";
import AdminGalleryPage from "./adminGalleryPage";
import AdminAddGalleryPage from "./adminAddGallery";
import { LuFileSearch2 } from "react-icons/lu";
import { TfiGallery } from "react-icons/tfi";

export default function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const user = res.data;
        if (user.role === "admin") {
          setUserValidated(true);
        } else {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.error(err);
        setUserValidated(false);
      });
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
    <div className="w-full h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-[220px] h-full bg-gray-900 text-white flex flex-col shadow-lg">
        <div className="px-4 py-6 text-center text-2xl font-bold border-b border-gray-700">
          <BsGraphDown className="inline-block mr-2" />
          Dashboard
        </div>

        <nav className="flex-1 mt-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-lg transition-colors ${
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

        <div className="p-4 border-t border-gray-700 text-sm text-gray-400 text-center">
          Admin Panel © {new Date().getFullYear()}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {userValidated && (
          <Routes path="/*">
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
