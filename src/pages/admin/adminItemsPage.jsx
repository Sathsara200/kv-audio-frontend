import axios from "axios";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";

export default function AdminItemsPage() {
  const [items, setItems] = useState([]);
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!itemsLoaded) {
      const token = localStorage.getItem("token");
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setItems(res.data);
          setItemsLoaded(true);
        })
        .catch((err) => console.error(err));
    }
  }, [itemsLoaded]);

  const handleDelete = (key) => {
    setItems(items.filter((item) => item.key !== key));
    const token = localStorage.getItem("token");
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setItemsLoaded(false))
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-full min-h-screen p-4 bg-gray-100 relative">
      {/* Loader */}
      {!itemsLoaded && (
        <div className="flex justify-center my-10">
          <div className="border-4 border-b-green-500 rounded-full animate-spin w-[80px] h-[80px]" />
        </div>
      )}

      {/* ================= DESKTOP TABLE ================= */}
      {itemsLoaded && (
        <div className="hidden md:block overflow-x-auto w-full bg-white shadow-md rounded-lg p-4">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">Key</th>
                <th className="p-3">Name</th>
                <th className="p-3">Price ($)</th>
                <th className="p-3">Category</th>
                <th className="p-3">Dimensions</th>
                <th className="p-3">Availability</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((product) => (
                <tr key={product.key} className="border-b hover:bg-gray-100">
                  <td className="p-3">{product.key}</td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">${product.price.toFixed(2)}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">{product.dimensions}</td>
                  <td className="p-3">
                    {product.availability ? "Available" : "Unavailable"}
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                    <button
                      onClick={() =>
                        navigate(`/admin/items/edit`, { state: product })
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.key)}
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

      {/* ================= MOBILE CARDS ================= */}
      {itemsLoaded && (
        <div className="md:hidden space-y-4 pb-24">
          {items.map((product) => (
            <div
              key={product.key}
              className="bg-white rounded-lg shadow p-4 space-y-2"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <span className="text-sm text-gray-500">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <div className="text-sm text-gray-600">
                <p><b>Category:</b> {product.category}</p>
                <p><b>Dimensions:</b> {product.dimensions}</p>
                <p>
                  <b>Status:</b>{" "}
                  <span
                    className={
                      product.availability
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {product.availability ? "Available" : "Unavailable"}
                  </span>
                </p>
              </div>

              <div className="flex justify-end gap-4 pt-2">
                <button
                  onClick={() =>
                    navigate(`/admin/items/edit`, { state: product })
                  }
                  className="text-blue-600"
                >
                  <FiEdit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(product.key)}
                  className="text-red-600"
                >
                  <FiTrash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Add Button */}
      <Link to="/admin/items/add">
        <div className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition">
          <CiCirclePlus size={36} />
        </div>
      </Link>
    </div>
  );
}
