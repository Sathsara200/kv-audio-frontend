export default function GalleryCard({ title, description, imageUrl, date }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src={imageUrl}
        alt={title || "Gallery Image"}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        {title && (
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-sm text-gray-600 mb-2">{description}</p>
        )}
        <p className="text-xs text-gray-400">
          {new Date(date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
