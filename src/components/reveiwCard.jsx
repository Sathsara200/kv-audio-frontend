import { FaStar, FaRegStar } from "react-icons/fa";

export default function ReviewCard({ review }) {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= review.rating ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-gray-300" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 w-{90%} mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={review.profilePicture}
          alt={review.name}
          className="w-14 h-14 rounded-full object-cover border border-gray-300 shadow-sm"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
          <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-3">{renderStars()}</div>

      <p className="text-gray-700 text-base leading-relaxed italic">
        “{review.comment}”
      </p>
    </div>
  );
}
