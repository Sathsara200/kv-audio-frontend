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
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setInquiries(res.data);
      } catch (error) {
        console.error("Failed to fetch inquiries", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/inquiries/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setInquiries((prev) => prev.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Failed to delete inquiry", error);
    }
  };

  const handleResolve = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/inquiries/${id}`,
        { isResolved: true },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setInquiries((prev) =>
        prev.map((i) =>
          i.id === id ? { ...i, isResolved: true } : i
        )
      );
    } catch (error) {
      console.error("Failed to update inquiry", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Page Header */}
      <div className="p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold">
          Admin Inquiries
        </h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-3 pb-24">
        {loading ? (
          <p className="text-gray-600 text-center mt-10">
            Loading inquiries...
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg shadow">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-3 py-2 text-left text-sm">ID</th>
                  <th className="px-3 py-2 text-left text-sm">Email</th>
                  <th className="px-3 py-2 text-left text-sm">Phone</th>
                  <th className="px-3 py-2 text-left text-sm">Message</th>
                  <th className="px-3 py-2 text-left text-sm">Date</th>
                  <th className="px-3 py-2 text-left text-sm">Resolved</th>
                  <th className="px-3 py-2 text-center text-sm">Actions</th>
                </tr>
              </thead>

              <tbody>
                {inquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-3 py-2 text-sm">
                      {inq.id}
                    </td>
                    <td className="px-3 py-2 text-sm break-all">
                      {inq.email}
                    </td>
                    <td className="px-3 py-2 text-sm">
                      {inq.phone}
                    </td>
                    <td className="px-3 py-2 text-sm max-w-xs break-words">
                      {inq.message}
                    </td>
                    <td className="px-3 py-2 text-sm">
                      {new Date(inq.date).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-2 text-sm">
                      {inq.isResolved ? "Yes" : "No"}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex justify-center gap-2">
                        {!inq.isResolved && (
                          <button
                            onClick={() => handleResolve(inq.id)}
                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                            title="Mark as Resolved"
                          >
                            <FaCheckCircle size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(inq.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                          title="Delete Inquiry"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {inquiries.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-6 text-gray-500"
                    >
                      No inquiries found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
