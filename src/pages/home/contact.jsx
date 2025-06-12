import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "../../components/footer";

export default function ContactUs() {
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login to send a message.");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/inquiries`,
        {
          message: message, // ✅ Only send the message
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Backend extracts user from token
          },
        }
      );

      toast.success("Message sent successfully!");
      setMessage("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div>
      <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-600">Message</label>
              <textarea
                name="message"
                rows="4"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                placeholder="Your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-600 text-white font-semibold py-3 rounded-lg hover:bg-yellow-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <section>
        <Footer />
      </section>
    </div>
  );
}
