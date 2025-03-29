import type { Route } from "./+types/home";
import { useState } from "react";
import Post from "../components/Post";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SYBI Home" },
    { name: "description", content: "Should you buy it?" },
  ];
}

export default function Home() {
  const [brand, setBrand] = useState("");
  const [dateOrder, setDateOrder] = useState("asc");
  const [reviewOrder, setReviewOrder] = useState("best");

  const brands = ["PJ Wears", "Brand B", "Brand C"];
  const posts = [
    {
      title: "Amazing Experience",
      author: "Treasure W.",
      content: "My dresses from PJ Wears are exactly as advertised, I also got a free gift with my order. I'll definitely be purchasing again.",
      dateAdded: "2023-12-01",
      reviews: 4,
      reviewComment: "Beautiful pieces",
      recommended: true,
      brand: "PJ Wears",
    },
    {
      title: "Good Purchase",
      author: "John D.",
      content: "Quality product, fast delivery. Very satisfied with my purchase.",
      dateAdded: "2023-12-02",
      reviews: 5,
      reviewComment: "Excellent service",
      recommended: true,
      brand: "Brand B",
    },
    {
      title: "Bad Buy",
      author: "Ifeoluwa Onigbinde",
      content: "I really didn't like what I got, she did this and that and I really didn't like it, and then i did this and that and I really didn't like it.",
      dateAdded: "2023-12-02",
      reviews: 2,
      reviewComment: "terrible service",
      recommended: false,
      brand: "Brand C",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Latest Reviews</h3>
        <p className="text-gray-600">Find trusted reviews from real customers</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="bg-white border border-gray-200 p-2 rounded-lg shadow-sm hover:border-lime-500/50 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-500/50 w-full sm:w-auto"
        >
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        <select
          value={dateOrder}
          onChange={(e) => setDateOrder(e.target.value)}
          className="bg-white border border-gray-200 p-2 rounded-lg shadow-sm hover:border-lime-500/50 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-500/50 w-full sm:w-auto"
        >
          <option value="asc">Date Added (Ascending)</option>
          <option value="desc">Date Added (Descending)</option>
        </select>
        <select
          value={reviewOrder}
          onChange={(e) => setReviewOrder(e.target.value)}
          className="bg-white border border-gray-200 p-2 rounded-lg shadow-sm hover:border-lime-500/50 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-500/50 w-full sm:w-auto"
        >
          <option value="best">Reviews (Ascending)</option>
          <option value="worst">Reviews (Descending)</option>
        </select>
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        {posts.map((post) => (
          <Post key={post.title} {...post} />
        ))}
      </div>
    </div>
  );
}
