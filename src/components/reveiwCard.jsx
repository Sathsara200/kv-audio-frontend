import { FaStar, FaRegStar } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";


export default function ReviewCard({review, doit}) {
 

  const renderStars = () => {
    return [...Array(5)].map((_, i) =>
      i < review.rating ? (
        <FaStar key={i} className="text-yellow-400" />
      ) : (
        <FaRegStar key={i} className="text-gray-300" />
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 w-[95%] mx-auto relative m-4">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={review.profilePicture}
          alt={review.name}
          className="w-14 h-14 rounded-full object-cover border border-gray-300 shadow-sm"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
          <p className="text-sm text-gray-500">
            {new Date(review.date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <MdOutlineDelete
        className="w-7 h-7 absolute right-4 top-8 cursor-pointer text-red-500 hover:text-red-700"
        onClick={() => doit(review.email)}
        title="Delete review"
      />

      <div className="flex items-center gap-1 mb-3">{renderStars()}</div>

      <p className="text-gray-700 text-base leading-relaxed italic">
        “{review.comment}”
      </p>
    </div>
  );
}
