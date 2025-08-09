import axios from "axios";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";

export default function AdminGalleryPage() {
  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!imagesLoaded) {
      const token = localStorage.getItem("token");
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/gallerys`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("Gallery data:", res.data);
          setImages(res.data);
          setImagesLoaded(true);
        })
        .catch((err) => {
          console.error("Error fetching gallery:", err);
        });
    }
  }, [imagesLoaded]);

  const handleDelete = (id) => {
    // Remove from UI immediately
    setImages(images.filter((item) => item._id !== id));

    // Send delete request to backend
    const token = localStorage.getItem("token");
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/gallerys/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setImagesLoaded(false); // Refresh list after delete
      })
      .catch((err) => {
        console.error("Error deleting image:", err);
      });
  };

  return (
    <div className="w-full min-h-screen p-5 bg-gray-100 flex flex-col items-center">
      {!imagesLoaded && (
        <div className="border-4 my-4 border-b-green-500 rounded-full animate-spin w-[100px] h-[100px]"></div>
      )}

      {imagesLoaded && (
        <div className="overflow-x-auto w-full max-w-5xl bg-white shadow-md rounded-lg p-4">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">Image</th>
                <th className="p-3">Title</th>
                <th className="p-3">Description</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {images.map((img) => (
                <tr key={img._id} className="border-b hover:bg-gray-100">
                  <td className="p-3">
                    <img
                      src={img.imageUrl}
                      alt={img.title || "Gallery"}
                      className="w-32 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{img.title || "-"}</td>
                  <td className="p-3">{img.description || "-"}</td>
                  <td className="p-3">
                    {new Date(img.date).toLocaleDateString()}
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                   
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

      <Link to="/admin/gallery/add" className="fixed bottom-6 right-6">
        <CiCirclePlus className="text-[70px] text-blue-600 hover:text-blue-800 transition duration-200 cursor-pointer" />
      </Link>
    </div>
  );
}
