import type { Route } from "./+types/home";
import { use, useEffect, useState } from "react";
import Select from "react-select";
import Post from "../components/Post";
import { getBrands, getReviews } from "../supabase/sybi_crud";
import type { Brand, Review } from "app/supabase/models";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SYBI Home" },
    { name: "description", content: "Should you buy it?" },
  ];
}

export default function Home() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [currentBrand, setCurrentBrand] = useState<Brand>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [dateOrder, setDateOrder] = useState("asc");
  const [reviewOrder, setReviewOrder] = useState("best");

  useEffect(() => {
    fetchReviews(currentBrand);
  }, [currentBrand]);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    const brands_data = await getBrands();
    setBrands(brands_data);
  };

  const fetchReviews = async (currentBrand: Brand | undefined) => {
    const review_data = await getReviews(currentBrand);
    setReviews(review_data);
  };

  // Convert brands array to react-select format
  const brandOptions = [
    { value: "All", label: "All" },
    ...brands.map((brand) => ({
      value: brand.name,
      label: brand.name,
    })),
  ];

  const handleBrandSelect = (selectedOption: any) => {
    setCurrentBrand(brands.find((brand) => brand.name == selectedOption.value));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 mt-8">
        <div className="w-full sm:w-[400px] lg:w-[500px]">
          <Select
            value={brandOptions.find(
              (option) => option.value === currentBrand?.name,
            )}
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Latest Reviews
        </h1>
        <p className="text-gray-600">
          Discover what others are saying about businesses
        </p>
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        {reviews.map((review: Review) => (
          <Post key={review.title} {...review} />
        ))}
      </div>
    </div>
  );
}
