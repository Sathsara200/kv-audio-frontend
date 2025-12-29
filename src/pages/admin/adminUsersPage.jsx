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
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) fetchUsers();
  }, [loading]);

  function handleBlockUser(email) {
    const token = localStorage.getItem("token");
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/block/${email}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => setLoading(true))
      .catch(console.error);
  }

  return (
    <div className="p-4 md:p-6 pb-28 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Admin Users</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <>
          {/* ================= MOBILE VIEW ================= */}
          <div className="space-y-4 md:hidden">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-xl shadow p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                  {user.firstName?.[0]}
                </div>

                <div className="flex-1">
                  <p className="font-semibold">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-sm">Role: {user.role}</p>
                  <p
                    onClick={() => handleBlockUser(user.email)}
                    className={`text-sm font-semibold cursor-pointer ${
                      user.isBlocked ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    Status: {user.isBlocked ? "BLOCKED" : "ACTIVE"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ================= DESKTOP VIEW ================= */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg shadow">
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
                        src={
                          user.profilePicture ||
                          "https://via.placeholder.com/50"
                        }
                        alt="Profile"
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
                        user.isBlocked
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {user.isBlocked ? "BLOCKED" : "ACTIVE"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
