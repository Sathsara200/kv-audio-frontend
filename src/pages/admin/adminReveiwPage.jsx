import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/reviews`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReviews(res.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) fetchReviews();
  }, [loading]);

  const handleApproveReview = (email) => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews/approve/${email}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => setLoading(true))
      .catch(console.error);
  };

  const handleDeleteReview = (email) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setLoading(true))
      .catch(console.error);
  };

  return (
    <div className="p-4 md:p-6 pb-28 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Admin Reviews</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <>
          {/* ================= MOBILE VIEW ================= */}
          <div className="space-y-4 md:hidden">
            {reviews.map((review) => (
              <div
                key={review.email}
                className="bg-white rounded-xl shadow p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={review.profilePicture || "https://via.placeholder.com/50"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.email}</p>
                  </div>
                </div>

                <p className="text-sm mb-1">
                  <span className="font-semibold">Rating:</span> {review.rating}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-semibold">Comment:</span>{" "}
                  {review.comment}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(review.date).toLocaleDateString()}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    review.isApproved ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  Status: {review.isApproved ? "APPROVED" : "PENDING"}
                </p>

                <div className="flex gap-2 mt-3">
                  {!review.isApproved && (
                    <button
                      onClick={() => handleApproveReview(review.email)}
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteReview(review.email)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
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
                  <th className="px-4 py-2 text-left">Rating</th>
                  <th className="px-4 py-2 text-left">Comment</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr
                    key={review.email}
                    className="border-t hover:bg-gray-100"
                  >
                    <td className="px-4 py-2">
                      <img
                        src={review.profilePicture}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="px-4 py-2">{review.name}</td>
                    <td className="px-4 py-2">{review.email}</td>
                    <td className="px-4 py-2">{review.rating}</td>
                    <td className="px-4 py-2 max-w-xs">
                      {review.comment}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(review.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 font-semibold">
                      {review.isApproved ? "APPROVED" : "PENDING"}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-col gap-1">
                        {!review.isApproved && (
                          <button
                            onClick={() =>
                              handleApproveReview(review.email)
                            }
                            className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() =>
                            handleDeleteReview(review.email)
                          }
                          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                        >
                          Delete
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
