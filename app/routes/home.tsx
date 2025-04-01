import type { Route } from "./+types/home";
import { useState } from "react";
import Select from 'react-select';
import Post from "../components/Post";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SYBI Home" },
    { name: "description", content: "Should you buy it?" },
  ];
}

export default function Home() {
  const [brand, setBrand] = useState<string>("");
  const [dateOrder, setDateOrder] = useState("asc");
  const [reviewOrder, setReviewOrder] = useState("best");

  const brands = ["PJ Wears", "Brand B", "Brand C"];
  
  // Convert brands array to react-select format
  const brandOptions = brands.map(brand => ({
    value: brand,
    label: brand
  }));

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

  const handleBrandSelect = (selectedOption: any) => {
    setBrand(selectedOption ? selectedOption.value : "");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 mt-8">
        <div className="w-full sm:w-auto">
          <Select
            value={brandOptions.find(option => option.value === brand)}
            onChange={handleBrandSelect}
            options={brandOptions}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Search brands..."
            isClearable
            isSearchable
          />
        </div>
      </div>
      
      <div className="text-center mb-8 mt-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Latest Reviews</h1>
        <p className="text-gray-600">Discover what others are saying about businesses</p>
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        {posts.map((post) => (
          <Post key={post.title} {...post} />
        ))}
      </div>
    </div>
  );
}
