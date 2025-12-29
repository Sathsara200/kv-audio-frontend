import axios from "axios";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FiTrash } from "react-icons/fi";

export default function AdminGalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallerys`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setImages(res.data);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    // Optimistic UI update
    setImages((prev) => prev.filter((img) => img._id !== id));

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallerys/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Delete failed:", err);
      fetchImages(); // rollback if failed
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-28">
      <h1 className="text-xl font-bold mb-4">Admin Gallery</h1>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center mt-20">
          <div className="border-4 border-gray-300 border-t-blue-600 rounded-full w-16 h-16 animate-spin"></div>
        </div>
      )}

      {/* ================= MOBILE CARDS ================= */}
      {!loading && (
        <div className="space-y-4 md:hidden">
          {images.map((img) => (
            <div
              key={img._id}
              className="bg-white rounded-lg shadow p-3"
            >
              <img
                src={img.imageUrl}
                alt={img.title || "Gallery"}
                className="w-full h-44 object-cover rounded"
              />

              <div className="mt-3 space-y-1">
                <p className="font-semibold text-sm">
                  {img.title || "Untitled"}
                </p>
                <p className="text-xs text-gray-600 break-words">
                  {img.description || "No description"}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(img.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  onClick={() => handleDelete(img._id)}
                  className="flex items-center gap-1 text-red-600 bg-red-100 px-3 py-1 rounded"
                >
                  <FiTrash />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= DESKTOP TABLE ================= */}
      {!loading && (
        <div className="hidden md:block bg-white shadow rounded-lg overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Title</th>
                <th className="p-3">Description</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {images.map((img) => (
                <tr key={img._id} className="border-b">
                  <td className="p-3">
                    <img
                      src={img.imageUrl}
                      alt=""
                      className="w-32 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{img.title || "-"}</td>
                  <td className="p-3 max-w-xs break-words">
                    {img.description || "-"}
                  </td>
                  <td className="p-3">
                    {new Date(img.date).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(img._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* FLOATING ADD BUTTON */}
     <Link to="/admin/gallery/add">
       <div className="fixed bottom-20 right-5 z-50">
         <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-xl active:scale-95 transition">
          <CiCirclePlus className="text-white text-4xl" />
         </div>
       </div>
      </Link>
    </div>
  );
}
