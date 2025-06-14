export default function GalleryCard({ item }) {
  return (
    <div className="w-[90%] max-w-5xl bg-white shadow-lg hover:shadow-2xl transition-shadow rounded-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[400px] m-4 border border-gray-100">
      {/* Image */}
      <div className="md:w-1/2 w-full h-[250px] md:h-full overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between md:w-1/2 w-full bg-white">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h2>
          <p className="text-gray-600 text-sm mb-4 line-clamp-4 leading-relaxed">
            {item.description}
          </p>
        </div>

        <p className="text-xs text-gray-400 italic text-right mt-4">
          {new Date(item.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
