"use client";

import { FC, useState, useRef, useEffect } from "react";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Star as StarIcon,
  Send,
  MessageCircle,
  User,
  Calendar,
  Reply,
  ZoomIn,
} from "lucide-react";
import Image from "next/image";

// Mock data for the product
const mockProduct = {
  id: "1",
  name: "Premium Moisturizing Face Cream",
  slug: "premium-moisturizing-face-cream",
  shortDescription:
    "Hydrating face cream with natural ingredients for all skin types",
  description:
    "This premium moisturizing face cream is formulated with natural ingredients to provide deep hydration and nourishment for all skin types. Enriched with hyaluronic acid, vitamin E, and botanical extracts, it helps maintain skin elasticity and promotes a healthy, radiant complexion. Perfect for daily use, morning and evening.",
  thumbnail:
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop",
  images: [
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=500&fit=crop",
  ],
  price: 2500,
  salePrice: 1999,
  stock: 25,
  stockStatus: "in-stock",
  sku: "PMF-001",
  tags: ["skincare", "moisturizer", "face-cream", "natural"],
  brand: "BeautyLab",
  weight: 50,
  material: "Organic ingredients",
  rating: 4.5,
  reviewsCount: 128,
  viewsCount: 1250,
  salesCount: 89,
  reviews: [
    {
      id: "1",
      rating: 5,
      title: "Amazing product!",
      comment:
        "This cream has transformed my skin. It's so hydrating and absorbs quickly without leaving any greasy residue.",
      user: {
        name: "Sarah Ahmed",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      },
      createdAt: "2024-02-15",
      reply: {
        comment:
          "Thank you for your wonderful feedback! We're thrilled to hear about your positive experience.",
        repliedBy: "Customer Service",
        repliedAt: "2024-02-16",
      },
    },
    {
      id: "2",
      rating: 4,
      title: "Good quality",
      comment:
        "Great moisturizer for the price. My skin feels softer after using it for a week.",
      user: {
        name: "Mahmud Hassan",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      createdAt: "2024-02-10",
    },
    {
      id: "3",
      rating: 5,
      title: "Perfect for sensitive skin",
      comment:
        "I have very sensitive skin and this cream doesn't cause any irritation. Highly recommended!",
      user: {
        name: "Fatima Khan",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      },
      createdAt: "2024-02-08",
    },
  ],
  qa: [
    {
      id: "1",
      question: "Is this suitable for oily skin?",
      answer:
        "Yes, this cream is formulated for all skin types including oily skin. It's lightweight and non-comedogenic.",
      date: "2024-02-12",
      askedBy: "Nadia Rahman",
    },
    {
      id: "2",
      question: "How long does one jar last?",
      answer:
        "With regular daily use (morning and evening), one 50g jar typically lasts about 6-8 weeks.",
      date: "2024-02-10",
      askedBy: "Ahmed Ali",
    },
    {
      id: "3",
      question: "Can I use this under makeup?",
      answer:
        "Absolutely! This cream absorbs quickly and creates an excellent base for makeup application.",
      date: "2024-02-08",
      askedBy: "Rashida Begum",
    },
  ],
  howToUse:
    "Apply a small amount to clean, dry skin. Gently massage in circular motions until fully absorbed. Use twice daily, morning and evening. For best results, use consistently for at least 4 weeks. Avoid contact with eyes.",
};

const mockCategory = {
  category: "Skincare",
  slug: "skincare",
};

const SingleProduct: FC = () => {
  // State management
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const [reviews, setReviews] = useState(mockProduct.reviews);
  const [questions, setQuestions] = useState(mockProduct.qa);

  // Form states
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: "",
    comment: "",
    name: "",
  });
  const [qaForm, setQaForm] = useState({
    question: "",
    name: "",
  });

  const imageRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);

  const allImages = [mockProduct.thumbnail, ...mockProduct.images];

  // Auto-slide functionality
  useEffect(() => {
    if (allImages.length <= 1 || isHoveringSlider) return;

    const interval = setInterval(() => {
      setActiveImageIndex((prev) =>
        prev === allImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [allImages.length, isHoveringSlider]);

  // Navigation functions
  const handlePrevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  // Zoom functionality
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    if (x < 0 || x > width || y < 0 || y > height) {
      setShowZoom(false);
      return;
    }

    setShowZoom(true);
    const zoomX = (x / width) * 100;
    const zoomY = (y / height) * 100;
    setZoomPosition({ x: zoomX, y: zoomY });
  };

  // Form handlers
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !reviewForm.title.trim() ||
      !reviewForm.comment.trim() ||
      !reviewForm.name.trim()
    )
      return;

    const newReview = {
      id: Date.now().toString(),
      rating: reviewForm.rating,
      title: reviewForm.title,
      comment: reviewForm.comment,
      user: {
        name: reviewForm.name,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      },
      createdAt: new Date().toISOString().split("T")[0],
    };

    setReviews([newReview, ...reviews]);
    setReviewForm({ rating: 5, title: "", comment: "", name: "" });
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qaForm.question.trim() || !qaForm.name.trim()) return;

    const newQuestion = {
      id: Date.now().toString(),
      question: qaForm.question,
      answer:
        "Thank you for your question! Our team will respond within 24 hours.",
      date: new Date().toISOString().split("T")[0],
      askedBy: qaForm.name,
    };

    setQuestions([newQuestion, ...questions]);
    setQaForm({ question: "", name: "" });
  };

  // Price calculations
  const discountAmount = mockProduct.salePrice
    ? mockProduct.price - mockProduct.salePrice
    : 0;
  const discountPercentage = discountAmount
    ? Math.round((discountAmount / mockProduct.price) * 100)
    : 0;
  const currentPrice = mockProduct.salePrice || mockProduct.price;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-600">
            <span>Home</span> <span className="mx-2">/</span>
            <span>Categories</span> <span className="mx-2">/</span>
            <span>{mockCategory.category}</span> <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">
              {mockProduct.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div
            onMouseEnter={() => setIsHoveringSlider(true)}
            onMouseLeave={() => setIsHoveringSlider(false)}
            className="space-y-4"
          >
            <div className="relative w-full h-96 sm:h-[32rem] rounded-xl overflow-hidden bg-white shadow-lg group">
              <div
                ref={imageRef}
                className="relative w-full h-full cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setShowZoom(false)}
              >
                <Image
                  src={allImages[activeImageIndex]}
                  alt={mockProduct.name}
                  width={450}
                  height={450}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Zoom indicator */}
                {showZoom && (
                  <div
                    className="absolute w-20 h-20 bg-white/30 border-2 border-white rounded-full pointer-events-none backdrop-blur-sm"
                    style={{
                      transform: `translate(-50%, -50%)`,
                      left: `${zoomPosition.x}%`,
                      top: `${zoomPosition.y}%`,
                    }}
                  >
                    <ZoomIn className="w-6 h-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                )}

                {/* Navigation arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {activeImageIndex + 1} / {allImages.length}
                </div>
              </div>

              {/* Zoom view */}
              {showZoom && (
                <div
                  ref={zoomRef}
                  className="absolute top-0 left-full ml-8 w-96 h-96 bg-white rounded-xl overflow-hidden shadow-2xl hidden xl:block border-4 border-gray-200"
                  style={{ zIndex: 1000 }}
                >
                  <Image
                    src={allImages[activeImageIndex]}
                    alt={`${mockProduct.name} zoomed`}
                    className="w-full h-full object-cover"
                    height={200}
                    width={200}
                    style={{
                      transform: `scale(2.5) translate(-${
                        zoomPosition.x / 2.5
                      }%, -${zoomPosition.y / 2.5}%)`,
                      transformOrigin: "top left",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Thumbnail navigation */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <div
                    key={index}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-3 transition-all duration-300 flex-shrink-0 ${
                      activeImageIndex === index
                        ? "border-blue-500 shadow-lg scale-105"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`${mockProduct.name} thumbnail ${index + 1}`}
                      height={200}
                      width={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {mockProduct.name}
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                {mockProduct.shortDescription}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(mockProduct.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {mockProduct.rating} ({mockProduct.reviewsCount} reviews)
                </span>
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-3xl font-bold text-green-600">
                    ৳{currentPrice}
                  </span>
                  {discountAmount > 0 && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        ৳{mockProduct.price}
                      </span>
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {discountPercentage}% OFF
                      </div>
                    </>
                  )}
                </div>
                {discountAmount > 0 && (
                  <p className="text-sm text-green-600 font-medium">
                    You save ৳{discountAmount}
                  </p>
                )}
                <p className="text-sm text-green-600 mt-2 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  In Stock ({mockProduct.stock} available)
                </p>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 text-lg font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(mockProduct.stock, quantity + 1))
                    }
                    className="p-3 hover:bg-gray-100 transition-colors"
                    disabled={quantity >= mockProduct.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-8 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <span className="flex items-center justify-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </span>
                </button>

                <button className="p-4 bg-pink-50 border-2 border-pink-200 rounded-lg hover:bg-pink-100 transition-colors">
                  <Heart className="w-6 h-6 text-pink-500" />
                </button>
              </div>

              {/* Product Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">SKU:</span> {mockProduct.sku}
                </div>
                <div>
                  <span className="font-medium">Brand:</span>{" "}
                  {mockProduct.brand}
                </div>
                <div>
                  <span className="font-medium">Weight:</span>{" "}
                  {mockProduct.weight}g
                </div>
                <div>
                  <span className="font-medium">Category:</span>{" "}
                  {mockCategory.category}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tabbed Section */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-0">
                {[
                  { key: "description", label: "Description", icon: "📝" },
                  { key: "how-to-use", label: "How to Use", icon: "📋" },
                  {
                    key: "reviews",
                    label: `Reviews (${reviews.length})`,
                    icon: "⭐",
                  },
                  { key: "qa", label: `Q&A (${questions.length})`, icon: "❓" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    className={`flex-1 py-6 px-6 text-center font-semibold transition-all duration-300 relative ${
                      activeTab === tab.key
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg">{tab.icon}</span>
                      <span>{tab.label}</span>
                    </div>
                    {activeTab === tab.key && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === "description" && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Product Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {mockProduct.description}
                  </p>
                  <div className="bg-blue-50 rounded-lg p-6 mt-6">
                    <h3 className="font-semibold text-blue-900 mb-2">
                      Key Benefits:
                    </h3>
                    <ul className="text-blue-800 space-y-1">
                      <li>• Deep hydration for all skin types</li>
                      <li>• Natural ingredients with no harsh chemicals</li>
                      <li>• Quick absorption, non-greasy formula</li>
                      <li>• Suitable for sensitive skin</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "how-to-use" && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    How to Use
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {mockProduct.howToUse}
                  </p>
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="font-semibold text-green-900 mb-2">
                      Pro Tips:
                    </h3>
                    <ul className="text-green-800 space-y-1">
                      <li>
                        • Apply on slightly damp skin for better absorption
                      </li>
                      <li>• Use gentle upward strokes when applying</li>
                      <li>• Allow 2-3 minutes before applying makeup</li>
                      <li>• Store in a cool, dry place</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Customer Reviews
                    </h2>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(mockProduct.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">
                        {mockProduct.rating} out of 5
                      </p>
                    </div>
                  </div>

                  {/* Review Form */}
                  <form
                    onSubmit={handleReviewSubmit}
                    className="bg-gray-50 rounded-xl p-6 space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">
                      Write a Review
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          value={reviewForm.name}
                          onChange={(e) =>
                            setReviewForm({
                              ...reviewForm,
                              name: e.target.value,
                            })
                          }
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Rating
                        </label>
                        <select
                          value={reviewForm.rating}
                          onChange={(e) =>
                            setReviewForm({
                              ...reviewForm,
                              rating: parseInt(e.target.value),
                            })
                          }
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {[5, 4, 3, 2, 1].map((num) => (
                            <option key={num} value={num}>
                              {num} Star{num > 1 ? "s" : ""}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Review Title
                      </label>
                      <input
                        type="text"
                        value={reviewForm.title}
                        onChange={(e) =>
                          setReviewForm({
                            ...reviewForm,
                            title: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Summary of your review"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Review
                      </label>
                      <textarea
                        value={reviewForm.comment}
                        onChange={(e) =>
                          setReviewForm({
                            ...reviewForm,
                            comment: e.target.value,
                          })
                        }
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Share your experience with this product..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Submit Review
                    </button>
                  </form>

                  {/* Reviews List */}
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border border-gray-200 rounded-xl p-6"
                      >
                        <div className="flex items-start gap-4">
                          <Image
                            src={review.user.avatar}
                            alt={review.user.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-900">
                                  {review.user.name}
                                </h4>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? "text-yellow-400 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <span className="text-sm text-gray-500 flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {review.createdAt}
                              </span>
                            </div>

                            <h3 className="font-medium text-gray-900 mb-2">
                              {review.title}
                            </h3>
                            <p className="text-gray-700 mb-3">
                              {review.comment}
                            </p>

                            {review.reply && (
                              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                                <div className="flex items-center gap-2 mb-2">
                                  <Reply className="w-4 h-4 text-blue-600" />
                                  <span className="font-medium text-blue-900">
                                    {review.reply.repliedBy}
                                  </span>
                                  <span className="text-sm text-blue-600">
                                    {review.reply.repliedAt}
                                  </span>
                                </div>
                                <p className="text-blue-800">
                                  {review.reply.comment}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "qa" && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Questions & Answers
                  </h2>

                  {/* Question Form */}
                  <form
                    onSubmit={handleQuestionSubmit}
                    className="bg-gray-50 rounded-xl p-6 space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">
                      Ask a Question
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={qaForm.name}
                        onChange={(e) =>
                          setQaForm({ ...qaForm, name: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Question
                      </label>
                      <textarea
                        value={qaForm.question}
                        onChange={(e) =>
                          setQaForm({ ...qaForm, question: e.target.value })
                        }
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="What would you like to know about this product?"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Ask Question
                    </button>
                  </form>

                  {/* Questions List */}
                  <div className="space-y-6">
                    {questions.map((qa) => (
                      <div
                        key={qa.id}
                        className="border border-gray-200 rounded-xl p-6"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-medium text-gray-900">
                                {qa.askedBy}
                              </span>
                              <span className="text-sm text-gray-500 flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {qa.date}
                              </span>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                              <p className="text-gray-900 font-medium mb-1">
                                Q: {qa.question}
                              </p>
                            </div>

                            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-green-900">
                                  Customer Service
                                </span>
                                <span className="text-sm text-green-600">
                                  Answered
                                </span>
                              </div>
                              <p className="text-green-800">
                                <strong>A:</strong> {qa.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                100% Genuine Products
              </h3>
              <p className="text-sm text-gray-600">
                Authentic products directly from authorized distributors
              </p>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Secure Payments
              </h3>
              <p className="text-sm text-gray-600">
                Your payment information is processed securely
              </p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Fast Delivery
              </h3>
              <p className="text-sm text-gray-600">
                Quick delivery across Bangladesh within 1-3 days
              </p>
            </div>
          </div>
        </div>

        {/* Recently Viewed Products */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={`https://images.unsplash.com/photo-${
                      1556228578 + item * 1000
                    }-8c89e6adf883?w=300&h=300&fit=crop`}
                    alt={`Product ${item}`}
                    width={50}
                    height={50}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                    15% OFF
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Premium Product {item}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-green-600">
                      ৳{1500 + item * 200}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ৳{1800 + item * 200}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">(4.5)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Category */}
        <div className="mt-8 text-center">
          <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back to {mockCategory.category}
          </button>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Smooth tab transitions */
        .tab-content {
          transition: all 0.3s ease-in-out;
        }

        /* Image hover effects */
        .image-container:hover .zoom-overlay {
          opacity: 1;
        }

        .zoom-overlay {
          transition: opacity 0.3s ease-in-out;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default SingleProduct;
