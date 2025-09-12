"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Testimonial } from "@/lip/types/testimonials";
import { testimonials } from "@/constant/DummayTestimonials";
import TestimonialCard from "./TestimonialCard";
import VideoModal from "./VideoModal";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedVideo, setSelectedVideo] = useState<Testimonial | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const itemsPerPage = 3;
  const totalSlides = Math.ceil(testimonials.length / itemsPerPage);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleVideoClick = (testimonial: Testimonial) => {
    setSelectedVideo(testimonial);
    setIsVideoModalOpen(true);
    setIsAutoPlaying(false);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
    setIsAutoPlaying(true);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(nextSlide, 5000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, nextSlide]);


  return (
    <>
      <section className="py-20 bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              গ্রাহক মতামত
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              আমাদের সন্তুষ্ট গ্রাহকদের সৌন্দর্য যাত্রার গল্প শুনুন
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-6"></div>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out py-5"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                      {testimonials
                        .slice(
                          slideIndex * itemsPerPage,
                          (slideIndex + 1) * itemsPerPage
                        )
                        .map((testimonial) => (
                          <TestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial}
                            onVideoClick={handleVideoClick}
                          />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-pink-50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            <button
              onClick={nextSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-pink-50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-12 space-x-3">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">৫০০০+</div>
              <div className="text-gray-600">সন্তুষ্ট গ্রাহক</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                ৪.৮★
              </div>
              <div className="text-gray-600">গড় রেটিং</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">৯৮%</div>
              <div className="text-gray-600">ফলাফলে সন্তুষ্ট</div>
            </div>
          </div>
        </div>
      </section>

      <VideoModal
        testimonial={selectedVideo}
        isOpen={isVideoModalOpen}
        onClose={closeVideoModal}
      />
    </>
  );
};

export default TestimonialsSection;
