import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow w-[300px] m-3 flex flex-col">
      {/* Product Image */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={item.image[0]}
          alt={item.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Content */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h2>
          <p className="text-sm text-gray-500">{item.category}</p>
          <p className="text-lg font-bold text-yellow-600 mt-2">{item.price}</p>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.description}</p>
        </div>

        {/* Availability & Action */}
        <div className="flex items-center justify-between mt-4">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              item.availability
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {item.availability ? "In Stock" : "Out of Stock"}
          </span>

          <Link
            to={`/product/${item.key}`}
            className="bg-yellow-300 text-black px-4 py-1 text-sm rounded-lg hover:bg-yellow-400 tansition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
