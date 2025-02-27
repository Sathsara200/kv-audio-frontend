export default function ProductCard({ item }) {
    console.log(item.image[0]);
    return (
        <div className="bg-white shadow-lg rounded-xl p-4 w-[300px]">
            <img
                src={item.image[0]}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
            <p className="text-gray-600 text-sm">{item.category}</p>
            <p className="text-gray-800 font-bold mt-1">{item.price}</p>
            <p className="text-gray-500 text-xs mt-2 truncate">{item.description}</p>

            <div className="flex items-center justify-between mt-4">
                <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        item.availability ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
                    }`}
                >
                    {item.availability ? "In Stock" : "Out of Stock"}
                </span>
                <button className="bg-blue-500 text-white px-3 py-1 text-sm rounded-lg hover:bg-blue-600 transition">
                    View details
                </button>
            </div>
        </div>
    );
}
