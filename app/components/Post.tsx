import { useState, useEffect } from "react";
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

  // Add effect to handle body scroll
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  return (
    <>
      <article
        className={`bg-white rounded-xl shadow-sm border ${
          isHighlighted ? "border-lime-500" : "border-gray-200"
        } overflow-hidden transition-all duration-300 hover:shadow-md`}
        itemScope
        itemType="https://schema.org/Review"
      >
        {/* Header Section - Updated text sizes */}
        <div className="p-4 sm:p-5">
          <div itemProp="author" itemScope itemType="https://schema.org/Person">
            <meta itemProp="name" content={user_name} />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-gray-600 font-semibold text-base sm:text-lg">
                    {user_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-sm sm:text-base text-gray-900">
                    {user_name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs sm:text-sm text-gray-500">
                      {brand_name}
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <div className="flex items-center -space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < rating ? "text-yellow-400" : "text-gray-200"
                          }`}
                          style={{
                            filter:
                              i < rating
                                ? "drop-shadow(0 1px 1px rgba(0,0,0,0.1))"
                                : "none",
                          }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            itemProp="itemReviewed"
            itemScope
            itemType="https://schema.org/Organization"
          >
            <meta itemProp="name" content={brand_name} />
          </div>

          <h4
            itemProp="name"
            className="text-base sm:text-lg font-semibold text-gray-900 mb-2 leading-snug"
          >
            {title}
          </h4>
          <p
            itemProp="reviewBody"
            className="text-xs sm:text-sm text-gray-600 leading-relaxed"
          >
            {description}
          </p>

          <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
            <meta itemProp="ratingValue" content={rating.toString()} />
            <meta itemProp="bestRating" content="5" />
          </div>
        </div>

        {/* Updated Images Section with fixed size */}
        {images && images.length > 0 && (
          <div className="border-t border-gray-100">
            <div
              className={`grid ${
                images.length === 1 ? "grid-cols-1" : "grid-cols-2"
              } gap-px bg-gray-100 h-40`}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative cursor-zoom-in overflow-hidden bg-gray-50"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer - Updated text sizes */}
        <div className="border-t border-gray-100 px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-br from-gray-50 to-white flex items-center justify-between">
          <meta
            itemProp="recommendationStatus"
            content={recommended ? "PositiveNotes" : "NegativeNotes"}
          />
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              Should you buy it?
            </span>
            <span
              className={`px-2.5 sm:px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                recommended
                  ? "bg-lime-100 text-lime-800 border border-lime-200 shadow-sm shadow-lime-100"
                  : "bg-red-50 text-red-800 border border-red-100 shadow-sm shadow-red-50"
              }`}
            >
              {recommended ? "Yes!" : "No"}
            </span>
          </div>
        </div>
      </article>

      {/* Updated Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 overflow-y-auto overflow-x-hidden"
          onClick={() => setSelectedImage(null)}
        >
          <div className="min-h-screen px-4 py-8 flex flex-col items-center justify-center">
            {/* Top close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="fixed top-4 right-4 p-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm transition-all duration-200 z-[60]"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Updated Image container with reduced size */}
            <div
              className="relative max-w-2xl w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="w-full h-auto object-contain rounded-lg shadow-2xl max-h-[60vh]"
              />
            </div>

            {/* Bottom close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="mt-4 px-6 py-2 text-white/90 hover:text-white bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-sm transition-all duration-200 text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
