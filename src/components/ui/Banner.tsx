/* eslint-disable @typescript-eslint/no-unused-vars */

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  CheckCircle2,
  ArrowBigRight,
} from "lucide-react";
import Button from "@/lib/ui/Button";

const Banner = () => {
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "আধুনিক ব্যবসার জন্য ডিজিটাল সমাধান",
      subtitle: "আপনার ব্যবসাকে এগিয়ে নিয়ে যান প্রযুক্তির সাথে",
      description:
        "আমরা তৈরি করি অসাধারণ ওয়েব অ্যাপ্লিকেশন যা আপনার ব্র্যান্ডকে নতুন উচ্চতায় পৌঁছে দেয়।",
      buttonText: "আরো জানুন",
      features: ["রেসপন্সিভ ডিজাইন", "দ্রুত লোডিং", "SEO অপ্টিমাইজড"],
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "ই-কমার্স এর নতুন যুগে স্বাগতম",
      subtitle: "অনলাইন বিক্রয়ে এগিয়ে থাকুন",
      description:
        "শক্তিশালী ই-কমার্স প্ল্যাটফর্ম দিয়ে আপনার পণ্য বিক্রি করুন সারা বিশ্বে।",
      buttonText: "শুরু করুন",
      features: [
        "নিরাপদ পেমেন্ট",
        "ইনভেন্টরি ম্যানেজমেন্ট",
        "কাস্টমার সাপোর্ট",
      ],
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "ডেটা অ্যানালিটিক্স ও AI সল্যুশন",
      subtitle: "স্মার্ট সিদ্ধান্ত নিন ডেটার ভিত্তিতে",
      description:
        "কৃত্রিম বুদ্ধিমত্তা ও ডেটা বিশ্লেষণের মাধ্যমে আপনার ব্যবসায়িক লক্ষ্য অর্জন করুন।",
      buttonText: "ডেমো দেখুন",
      features: [
        "রিয়েল-টাইম ডেটা",
        "প্রেডিক্টিভ অ্যানালিসিস",
        "কাস্টম রিপোর্ট",
      ],
    },
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [direction, setDirection] = useState<number>(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
    },
    [currentSlide]
  );

  // Auto slide
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          prevSlide();
          break;
        case "ArrowRight":
          e.preventDefault();
          nextSlide();
          break;
        case " ":
          e.preventDefault();
          setIsPlaying(!isPlaying);
          break;
        case "Escape":
          setIsPlaying(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [nextSlide, prevSlide, isPlaying]);

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Animated Content */}
            <div
              key={currentSlide}
              className="animate-fade-in-up"
              style={{
                animation: "fadeInUp 0.8s ease-out",
              }}
            >
              <div className="mb-4">
                <span className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600/20 backdrop-blur-sm rounded-full border border-blue-500/30">
                  {currentSlideData.subtitle}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {currentSlideData.title}
              </h1>

              <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
                {currentSlideData.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-4 mb-8">
                {currentSlideData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-white/90"
                    style={{
                      animation: `fadeInUp 0.8s ease-out ${
                        (index + 1) * 0.1
                      }s both`,
                    }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div
                className="flex space-x-4"
                style={{
                  animation: "fadeInUp 0.8s ease-out 0.4s both",
                }}
              >
                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowBigRight size={16} />}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <span>{currentSlideData.buttonText}</span>
                </Button>

                <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300">
                  সার্ভিস দেখুন
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300"
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="group relative"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className="w-12 h-2 rounded-full bg-white/30 overflow-hidden">
                <div
                  className={`h-full bg-white transition-all duration-300 ${
                    index === currentSlide ? "w-full" : "w-0"
                  }`}
                />
              </div>
              {index === currentSlide && (
                <div
                  className="absolute -top-1 left-0 w-full h-4 bg-white/50 rounded-full animate-pulse"
                  style={{
                    animation: "progress 5s linear infinite",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard Instructions */}
      <div className="absolute bottom-8 right-8 z-20 text-white/60 text-sm">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 space-y-1">
          <div>← → নেভিগেশন</div>
          <div>স্পেসবার প্লে/পজ</div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progress {
          from {
            transform: scaleX(0);
            transform-origin: left;
          }
          to {
            transform: scaleX(1);
            transform-origin: left;
          }
        }
      `}</style>
    </div>
  );
};

export default Banner;
