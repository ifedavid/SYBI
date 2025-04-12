import { useState } from "react";
import type { Review } from "../supabase/models";
import PostModal from "./PostModal";

type PostProps = Review;

export default function Post({
  title,
  description,
  rating,
  brand_name,
  user_name,
  recommended,
  images,
}: PostProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <article className="bg-white rounded-xl shadow-lg transition-shadow duration-300 border border-gray-100 p-6 hover:shadow-xl">
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
        <div className="border-t border-gray-100 pt-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-800 font-medium">
              Should you buy it?
            </span>
            <span
              className={`font-semibold ${recommended ? "text-lime-600" : "text-red-500"}`}
            >
              {recommended ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </article>

      <PostModal
        review={{
          title,
          description,
          rating,
          brand_name,
          user_name,
          recommended,
          images,
        }}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
