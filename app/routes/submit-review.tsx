import { useEffect, useState } from "react";
import Select from "react-select";
import type { Brand, Review, User } from "app/supabase/models";
import type { Route } from "./+types/submit-review";
import {
  createBrand,
  createReview,
  createUser,
  getBrands,
  uploadImages,
} from "app/supabase/sybi_crud";
import type {
  CreateBrand,
  CreateReview,
  CreateUser,
} from "app/supabase/sybi_crud";
import { getInstagramUrl } from "../utils/instagram";
import { useNavigate } from "react-router-dom";

class BusinessType {
  static NEW = "new";
  static EXISTING = "existing";
}

class Recommendation {
  static NO = "no";
  static YES = "yes";
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Submit a Business Review in Nigeria | SYBI" },
    {
      name: "description",
      content:
        "Share your experience with Nigerian brands and businesses. Help others make informed decisions with your honest review and ratings.",
    },
    {
      name: "keywords",
      content:
        "submit review, rate business Nigeria, customer feedback, Nigerian brands review",
    },
  ];
}

export default function SubmitReview() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    businessType: BusinessType.EXISTING, // "existing" or "new"
    brandName: "",
    category: "",
    instagramHandle: "",
    websiteUrl: "",
    rating: 5,
    title: "",
    review: "",
    recommendation: Recommendation.YES,
    reviewerName: "",
    email: "",
    isAnonymous: false,
    images: [] as File[],
    agreedToTerms: false, // Add this new state
  });

  const [brands, setBrands] = useState<Brand[]>([]);
  const [currentBrand, setCurrentBrand] = useState<Brand>();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Mock data for existing businesses - replace with actual data from your backend
  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    const brands_data = await getBrands();
    setBrands(brands_data);
  };

  // Add this array of preset review titles
  const reviewTitleOptions = [
    "Great Experience Overall",
    "Disappointing Service",
    "Excellent Value for Money",
    "Room for Improvement",
    "Highly Recommended",
    "Mixed Feelings",
  ];

  // Convert existing businesses to react-select format
  const businessOptions = brands.map((brand) => ({
    value: brand.name,
    label: brand.name,
  }));

  // Add this handler for react-select
  const handleBrandsSelect = (selectedOption: any) => {
    setCurrentBrand(
      brands.find((brand) => brand.name === selectedOption?.value)
    );
    setFormData((prev) => ({
      ...prev,
      brandName: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreedToTerms) {
      alert("Please agree to our terms and privacy policy to continue");
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload images first
      let imageUrls: string[] = [];
      if (formData.images.length > 0) {
        imageUrls = await uploadImages(formData.images);
      }

      // Handle user creation
      const ANONYMOUS = "Anonymous";
      let user: CreateUser = {
        name: ANONYMOUS,
        email: ANONYMOUS,
      };

      if (!formData.isAnonymous) {
        user = {
          name: formData.reviewerName,
          email: formData.email,
        };
        await createUser(user);
      }

      // Handle brand creation
      let brand: CreateBrand = {
        category: currentBrand?.category || "",
        name: currentBrand?.name || " ",
        url: currentBrand?.url || "",
        insta_url: currentBrand?.insta_url || "",
      };

      if (formData.businessType === BusinessType.NEW) {
        const instaUrl = getInstagramUrl(formData.instagramHandle);
        brand = {
          category: formData.category,
          name: formData.brandName,
          url: formData.websiteUrl || instaUrl, // Use Instagram URL if website URL is not provided
          insta_url: instaUrl,
        };
        // Wait for brand creation to complete
        await createBrand(brand);
        // Add a small delay to ensure database consistency
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // Create review after user and brand are created
      const review: CreateReview = {
        title: formData.title,
        description: formData.review,
        rating: formData.rating,
        recommended: formData.recommendation === Recommendation.YES,
        brand_name: brand.name,
        brand_url: brand.url,
        user_name: user.name,
        user_email: user.email,
        images: imageUrls,
      };

      const newReview = await createReview(review);
      if (Array.isArray(newReview) && newReview.length > 0) {
        // Redirect to home page with the new review ID
        navigate("/", { state: { newReviewId: newReview[0].id } });
      }
    } catch (error) {
      console.error("Error in submission:", error);
      // You might want to show an error notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 6) {
      alert("You can only upload up to 6 images");
      return;
    }
    setFormData((prev) => ({ ...prev, images: files }));

    // Create previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div 
      className="max-w-2xl mx-auto relative"
      itemScope 
      itemType="https://schema.org/ReviewAction"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Review a Nigerian Business
        </h1>
        <p className="text-gray-600">
          Share your experience to help others make informed decisions about
          Nigerian brands
        </p>
      </div>

      <form 
        onSubmit={handleSubmit} 
        className="bg-white rounded-xl shadow-lg p-6 space-y-6"
        itemProp="potentialAction"
        itemScope 
        itemType="https://schema.org/ReviewAction"
      >
        <meta itemProp="target" content="https://shouldyoubuyit.ng/submit-review" />
        {/* Business Type Selection */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Business Information
          </h2>

          <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="businessType"
                value={BusinessType.EXISTING}
                checked={formData.businessType === BusinessType.EXISTING}
                onChange={handleChange}
                className="text-lime-500 focus:ring-lime-500"
              />
              <span className="ml-2">Review Existing Business</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="businessType"
                value={BusinessType.NEW}
                checked={formData.businessType === BusinessType.NEW}
                onChange={handleChange}
                className="text-lime-500 focus:ring-lime-500"
              />
              <span className="ml-2">Add New Business</span>
            </label>
          </div>

          {formData.businessType === BusinessType.EXISTING ? (
            <div>
              <label
                htmlFor="businessName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Business <span className="text-red-500">*</span>
              </label>
              <Select
                id="businessName"
                name="businessName"
                value={businessOptions.find(
                  (option) => option.value === formData.brandName
                )}
                onChange={handleBrandsSelect}
                options={businessOptions}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Search for a business..."
                isClearable
                isSearchable
                required
              />
            </div>
          ) : (
            <>
              <div>
                <label
                  htmlFor="brandName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="brandName"
                  name="brandName"
                  required
                  value={formData.brandName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500"
                  placeholder="Enter business name"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Business Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500"
                >
                  <option value="">Select a category</option>
                  <option value="retail">Retail</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="service">Service</option>
                  <option value="technology">Technology</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="instagramHandle"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Instagram Handle <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    id="instagramHandle"
                    name="instagramHandle"
                    required
                    value={formData.instagramHandle}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500"
                    placeholder="instagram_handle"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="websiteUrl"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Website URL
                </label>
                <input
                  type="url"
                  id="websiteUrl"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500"
                  placeholder="https://www.example.com"
                />
              </div>
            </>
          )}
        </div>

        {/* Review Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Your Review</h2>
          <div>
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Rating *
            </label>
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, rating: star }))
                  }
                  className={`text-2xl ${
                    star <= formData.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Review Title <span className="text-red-500">*</span>
            </label>
            <select
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500"
            >
              <option value="">Select a title</option>
              {reviewTitleOptions.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Review <span className="text-red-500">*</span>
            </label>
            <textarea
              id="review"
              name="review"
              required
              value={formData.review}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500"
              placeholder="Share the details of your experience..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Would you recommend this business? *
            </label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="recommendation"
                  value={Recommendation.YES}
                  checked={formData.recommendation === Recommendation.YES}
                  onChange={handleChange}
                  className="text-lime-500 focus:ring-lime-500"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="recommendation"
                  value={Recommendation.NO}
                  checked={formData.recommendation === Recommendation.NO}
                  onChange={handleChange}
                  className="text-red-500 focus:ring-red-500"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Images (Maximum 6) <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-lime-600 hover:text-lime-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-lime-500"
                >
                  <span>Upload files</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    required
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB (max 6 images)
              </p>
            </div>
          </div>
        </div>

        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg
                    className="h-4 w-4"
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
              </div>
            ))}
          </div>
        )}

        {/* Reviewer Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Your Information
          </h2>

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="isAnonymous"
                checked={formData.isAnonymous}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isAnonymous: e.target.checked,
                  }))
                }
                className="text-lime-500 focus:ring-lime-500"
              />
              <span className="ml-2">Submit anonymously</span>
            </label>
          </div>

          {!formData.isAnonymous && (
            <>
              <div>
                <label
                  htmlFor="reviewerName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="reviewerName"
                  name="reviewerName"
                  required
                  value={formData.reviewerName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500"
                  placeholder="Enter your email"
                />
              </div>
            </>
          )}
        </div>

        {/* Legal Disclaimer */}
        <div className="space-y-4 border-t pt-4">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              name="agreedToTerms"
              checked={formData.agreedToTerms}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  agreedToTerms: e.target.checked,
                }))
              }
              className="mt-1 text-lime-500 focus:ring-lime-500"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree that by submitting this review, I have read and accepted
              the{" "}
              <a
                href="/terms_and_privacy"
                target="_blank"
                className="text-lime-600 hover:text-lime-700 underline"
              >
                Legal Terms of Service & Privacy Policy
              </a>
              . I confirm that this review is based on my genuine experience and
              all information provided is accurate to the best of my knowledge.{" "}
              <span className="text-red-500">*</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !formData.agreedToTerms}
          className={`w-full py-2 px-4 rounded-lg font-medium shadow-sm hover:shadow flex items-center justify-center gap-2 transition-colors ${
            isSubmitting || !formData.agreedToTerms
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-lime-500 hover:bg-lime-600"
          } text-white`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Submit Review
            </>
          )}
        </button>
      </form>
    </div>
  );
}
