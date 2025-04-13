import type { Route } from "./+types/home";
import { useEffect, useState } from "react";
import Select from "react-select";
import Post from "../components/Post";
import { getBrands, getReviews } from "../supabase/sybi_crud";
import type { Brand, Review } from "app/supabase/models";

const POSTS_PER_PAGE = 5;

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
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchReviews(currentBrand);
  }, [currentBrand]);

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentBrand]);

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
      value: brand,
      label: brand.name,
    })),
  ];

  const handleBrandSelect = (selectedOption: any) => {
    setCurrentBrand(
      brands.find((brand) => {
        return brand == selectedOption?.value;
      })
    );
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Calculate pagination
  const totalPages = Math.ceil(reviews.length / POSTS_PER_PAGE);
  const paginatedReviews = reviews.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    Math.min(currentPage * POSTS_PER_PAGE, reviews.length)
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Calculate average rating for current brand
  const calculateBrandScore = () => {
    if (!currentBrand || !reviews.length) return null;
    const brandReviews = reviews.filter(review => review.brand_name === currentBrand.name);
    const totalScore = brandReviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalScore / brandReviews.length).toFixed(1);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 mt-8">
        <div className="w-full sm:w-[400px] lg:w-[500px]">
          <Select
            value={brandOptions.find(
              (option) => option.value === currentBrand,
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

      <div className="text-center space-y-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {currentBrand ? `Reviews for ${currentBrand.name}` : "Latest Reviews"}
          </h1>
          <p className="text-gray-600">
            {currentBrand 
              ? `See what people are saying about ${currentBrand.name}`
              : "Discover what others are saying"}
          </p>
        </div>

        {currentBrand && (
          <div className="flex items-center justify-center gap-4 sm:gap-6 py-4 px-2 flex-wrap">
            <div className="flex items-center gap-4">
              {currentBrand.url && (
                <a 
                  href={currentBrand.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-lime-600 transition-colors"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span className="hidden sm:inline">Website</span>
                </a>
              )}
              
              {currentBrand.insta_url && (
                <a 
                  href={currentBrand.insta_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-lime-600 transition-colors"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="hidden sm:inline">Instagram</span>
                </a>
              )}

              {calculateBrandScore() && (
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                  <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium">{calculateBrandScore()}</span>
                  <span className="text-gray-400">/ 5</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        {paginatedReviews.map((review: Review) => (
          <Post 
            key={review.id} 
            {...review} 
            // isHighlighted={review.id === newReviewId}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-lg ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400"
                : "bg-lime-500 text-white hover:bg-lime-600"
            }`}
          >
            Previous
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Page</span>
            <select
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-600">of {totalPages}</span>
          </div>
          
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400"
                : "bg-lime-500 text-white hover:bg-lime-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
