import { useState } from "react";
import Select from 'react-select';
import type { Route } from "./+types/submit-review";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Submit a Review - SYBI" },
    { name: "description", content: "Share your experience and help others make informed decisions" },
  ];
}

export default function SubmitReview() {
  const [formData, setFormData] = useState({
    businessType: "existing", // "existing" or "new"
    businessName: "",
    category: "",
    instagramHandle: "",
    websiteUrl: "",
    rating: 5,
    title: "",
    review: "",
    recommendation: "yes",
    reviewerName: "",
    email: "",
    isAnonymous: false,
  });

  // Mock data for existing businesses - replace with actual data from your backend
  const existingBusinesses = [
    { id: 1, name: "PJ Wears" },
    { id: 2, name: "Brand B" },
    { id: 3, name: "Brand C" },
  ];

  // Add this array of preset review titles
  const reviewTitleOptions = [
    "Great Experience Overall",
    "Disappointing Service",
    "Excellent Value for Money",
    "Room for Improvement",
    "Highly Recommended",
    "Mixed Feelings"
  ];

  // Convert existing businesses to react-select format
  const businessOptions = existingBusinesses.map(business => ({
    value: business.name,
    label: business.name
  }));

  // Add this handler for react-select
  const handleBusinessSelect = (selectedOption: any) => {
    setFormData(prev => ({
      ...prev,
      businessName: selectedOption ? selectedOption.value : ""
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Submit a Review</h1>
        <p className="text-gray-600">Share your experience to help others make informed decisions</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Business Type Selection */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Business Information</h2>
          
          <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="businessType"
                value="existing"
                checked={formData.businessType === "existing"}
                onChange={handleChange}
                className="text-lime-500 focus:ring-lime-500"
              />
              <span className="ml-2">Review Existing Business</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="businessType"
                value="new"
                checked={formData.businessType === "new"}
                onChange={handleChange}
                className="text-lime-500 focus:ring-lime-500"
              />
              <span className="ml-2">Add New Business</span>
            </label>
          </div>

          {formData.businessType === "existing" ? (
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                Select Business *
              </label>
              <Select
                id="businessName"
                name="businessName"
                value={businessOptions.find(option => option.value === formData.businessName)}
                onChange={handleBusinessSelect}
                options={businessOptions}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Search for a business..."
                isClearable
                isSearchable
              />
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name *
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  required
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500"
                  placeholder="Enter business name"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Category *
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
                <label htmlFor="instagramHandle" className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram Handle
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    id="instagramHandle"
                    name="instagramHandle"
                    value={formData.instagramHandle}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500"
                    placeholder="instagram_handle"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 mb-1">
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
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
              Rating *
            </label>
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  className={`text-2xl ${
                    star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Review Title *
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
            <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
              Your Review *
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
                  value="yes"
                  checked={formData.recommendation === "yes"}
                  onChange={handleChange}
                  className="text-lime-500 focus:ring-lime-500"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="recommendation"
                  value="no"
                  checked={formData.recommendation === "no"}
                  onChange={handleChange}
                  className="text-red-500 focus:ring-red-500"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
        </div>

        {/* Reviewer Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Your Information</h2>
          
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="isAnonymous"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                className="text-lime-500 focus:ring-lime-500"
              />
              <span className="ml-2">Submit anonymously</span>
            </label>
          </div>

          {!formData.isAnonymous && (
            <>
              <div>
                <label htmlFor="reviewerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="reviewerName"
                  name="reviewerName"
                  value={formData.reviewerName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500"
                  placeholder="Enter your email"
                />
              </div>
            </>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-lime-500 text-white py-2 px-4 rounded-lg hover:bg-lime-600 transition-colors font-medium shadow-sm hover:shadow flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Submit Review
        </button>
      </form>
    </div>
  );
}
