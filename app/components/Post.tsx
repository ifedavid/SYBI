import { useState } from "react";
import type { Review } from "../supabase/models";

type PostProps = Review & {
  isHighlighted?: boolean;
};

export default function Post({
  title,
  description,
  rating,
  brand_name,
  user_name,
  recommended,
  images,
  isHighlighted,
}: PostProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <article
        className={`bg-white rounded-xl shadow-lg transition-all duration-300 border ${
          isHighlighted
            ? "border-lime-500 shadow-lime-100"
            : "border-gray-100"
        } p-6 hover:shadow-xl`}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">{user_name}</span>
            {/* {recommended && (
              <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                Verified reviewer
              </span>
            )} */}
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={i < rating ? "text-yellow-500" : "text-gray-300"}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <p className="text-gray-800 mb-4 leading-relaxed">{title}</p>
        <div className="flex items-center justify-between text-sm text-gray-700 mb-4">
          <span className="italic">"{description}"</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-lime-500 rounded-full"></span>
            {brand_name}
          </span>
        </div>

        {images && images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="aspect-square relative overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Review image ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-gray-100 pt-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-800 font-medium">
              Should you buy it?
            </span>
            <span
              className={`font-semibold ${
                recommended ? "text-lime-600" : "text-red-500"
              }`}
            >
              {recommended ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </article>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative min-h-screen flex items-center justify-center py-8">
            <div className="relative max-w-4xl w-full">
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              />
              <button
                className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center bg-white rounded-full text-gray-800 hover:bg-gray-100 transition-colors shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
