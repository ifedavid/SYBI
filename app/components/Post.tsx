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
        className={`bg-white rounded-xl shadow-sm border ${
          isHighlighted ? "border-lime-500" : "border-gray-200"
        } overflow-hidden transition-all duration-300 hover:shadow-md`}
      >
        {/* Header Section */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium">
                  {user_name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{user_name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <span>{brand_name}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>

        {/* Images Section - More Compact */}
        {images && images.length > 0 && (
          <div className="border-t border-gray-100">
            <div
              className={`grid ${
                images.length === 1 ? "grid-cols-1" : "grid-cols-2"
              } gap-px bg-gray-100`}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative cursor-zoom-in h-48"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="object-cover w-full h-full hover:opacity-90 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer - Should You Buy It Section */}
        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Should you buy it?
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                recommended
                  ? "bg-lime-100 text-lime-800 border border-lime-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {recommended ? "Yes!" : "No"}
            </span>
          </div>
        </div>
      </article>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full mx-auto">
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute -top-4 -right-4 w-8 h-8 flex items-center justify-center bg-white rounded-full text-gray-600 hover:text-gray-900 shadow-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
