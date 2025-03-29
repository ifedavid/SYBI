import React from 'react';

interface PostProps {
  author: string;
  title: string;
  content: string;
  dateAdded: string;
  reviews: number;
  reviewComment: string;
  recommended: boolean;
  brand: string;
}

export default function Post({ author, content, reviews, reviewComment, recommended, brand }: PostProps) {
  return (
    <article className="bg-white rounded-xl shadow-lg transition-shadow duration-300 border border-gray-100 p-6 hover:shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">{author}</span>
          {/* {recommended && (
            <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
              Verified reviewer
            </span>
          )} */}
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < reviews ? "text-yellow-500" : "text-gray-300"}>
              ★
            </span>
          ))}
        </div>
      </div>
      <p className="text-gray-800 mb-4 leading-relaxed">{content}</p>
      <div className="flex items-center justify-between text-sm text-gray-700 mb-4">
        <span className="italic">"{reviewComment}"</span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-lime-500 rounded-full"></span>
          {brand}
        </span>
      </div>
      <div className="border-t border-gray-100 pt-4 mt-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-800 font-medium">Should you buy it?</span>
          <span className={`font-semibold ${recommended ? 'text-lime-600' : 'text-red-500'}`}>
            {recommended ? 'Yes' : 'No'}
          </span>
        </div>
      </div>
    </article>
  );
}
