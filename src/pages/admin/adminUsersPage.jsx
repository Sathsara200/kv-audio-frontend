import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/all`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (loading) fetchUsers();
  }, [loading]);

  const handleBlockUser = async (email) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/block/${email}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoading(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading users...</p>;
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Users</h1>

      {/* ================= MOBILE VIEW ================= */}
      <div className="space-y-4 md:hidden">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-lg shadow p-4 flex gap-4"
          >
            <img
              src={user.profilePicture || "https://via.placeholder.com/50"}
              alt="profile"
              className="w-14 h-14 rounded-full"
            />

            <div className="flex-1">
              <p className="font-semibold">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm capitalize">Role: {user.role}</p>
              <p className="text-sm">
                Status:{" "}
                <span
                  onClick={() => handleBlockUser(user.email)}
                  className={`cursor-pointer font-semibold ${
                    user.isBlocked ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {user.isBlocked ? "BLOCKED" : "ACTIVE"}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Profile</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t hover:bg-gray-100"
              >
                <td className="px-4 py-2">
                  <img
                    src={user.profilePicture || "https://via.placeholder.com/50"}
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="px-4 py-2">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 capitalize">{user.role}</td>
                <td className="px-4 py-2">
                  {user.phone || user.phoneNumber}
                </td>
                <td className="px-4 py-2">{user.address}</td>
                <td
                  onClick={() => handleBlockUser(user.email)}
                  className={`px-4 py-2 cursor-pointer font-semibold ${
                    user.isBlocked ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {user.isBlocked ? "BLOCKED" : "ACTIVE"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
