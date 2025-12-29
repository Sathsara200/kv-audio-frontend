import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTrash } from "react-icons/fa";

export default function AdminInquiryPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/inquiries`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setInquiries(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/inquiries/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  };

  const handleResolve = async (id) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/inquiries/${id}`,
      { isResolved: true },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setInquiries((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, isResolved: true } : i
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-28">
      <h1 className="text-xl font-bold mb-4">Admin Inquiries</h1>

      {loading ? (
        <p className="text-center text-gray-500 mt-10">
          Loading inquiries...
        </p>
      ) : (
        <>
          {/* ================= MOBILE CARDS ================= */}
          <div className="space-y-4 md:hidden">
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                className="bg-white rounded-lg shadow p-4 space-y-2"
              >
                <div className="text-sm text-gray-500">
                  ID: {inq.id}
                </div>

                <div>
                  <p className="font-semibold text-sm">Email</p>
                  <p className="break-all text-sm">{inq.email}</p>
                </div>

                <div>
                  <p className="font-semibold text-sm">Phone</p>
                  <p className="text-sm">{inq.phone}</p>
                </div>

                <div>
                  <p className="font-semibold text-sm">Message</p>
                  <p className="text-sm break-words">{inq.message}</p>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span>
                    {new Date(inq.date).toLocaleDateString()}
                  </span>
                  <span
                    className={`font-semibold ${
                      inq.isResolved
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {inq.isResolved ? "Resolved" : "Pending"}
                  </span>
                </div>

                <div className="flex gap-3 pt-2">
                  {!inq.isResolved && (
                    <button
                      onClick={() => handleResolve(inq.id)}
                      className="flex-1 bg-green-500 text-white py-2 rounded"
                    >
                      Resolve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(inq.id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Message</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Resolved</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="border-t">
                    <td className="px-4 py-2">{inq.id}</td>
                    <td className="px-4 py-2">{inq.email}</td>
                    <td className="px-4 py-2">{inq.phone}</td>
                    <td className="px-4 py-2 max-w-xs break-words">
                      {inq.message}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(inq.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      {inq.isResolved ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        {!inq.isResolved && (
                          <button
                            onClick={() => handleResolve(inq.id)}
                            className="bg-green-500 text-white p-2 rounded"
                          >
                            <FaCheckCircle />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(inq.id)}
                          className="bg-red-500 text-white p-2 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
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
