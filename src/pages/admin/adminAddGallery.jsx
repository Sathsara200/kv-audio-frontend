import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });


  // Form input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new gallery item submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.imageUrl.trim()) {
      toast.error("Image URL is required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not authorized to add gallery images");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallerys`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGallery([...gallery, res.data]);
      setFormData({ title: "", description: "", imageUrl: "" });
      toast.success("Gallery image added successfully");
    } catch (err) {
      console.error("Error adding gallery image:", err);
      toast.error("Failed to add gallery image");
    }
  };


  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Gallery</h1>

      {/* Add Gallery Image Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4 border p-4 rounded shadow">
        <input
          type="text"
          name="title"
          placeholder="Title (optional)"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
          rows={3}
        />
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL (required)"
          value={formData.imageUrl}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          Add Image
        </button>
      </form>

    </div>
  )
}
