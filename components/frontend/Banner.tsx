
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
import Button from "@/lip/ui/Button";

// Define Slide interface for type safety
interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  features: string[];
}



const Banner = () => {
  const slides: Slide[] = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "প্রিমিয়াম বিউটি প্রোডাক্টে আপনার সৌন্দর্য উজ্জ্বল করুন",
      subtitle: "বিশ্বস্ত মানের পণ্য",
      description:
        "আমাদের উচ্চমানের বিউটি প্রোডাক্ট দিয়ে আপনার ত্বক ও চুলের যত্ন নিন। প্রাকৃতিক উপাদানে তৈরি, আপনার জন্য সেরা।",
      buttonText: "এখনই কিনুন",
      features: ["প্রাকৃতিক উপাদান", "দ্রুত শিপিং", "সেরা মানের নিশ্চয়তা"],
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "এক ক্লিকে বিউটি শপিং",
      subtitle: "সহজ ও নিরাপদ কেনাকাটা",
      description:
        "আমাদের ই-কমার্স প্ল্যাটফর্মে বিশ্বমানের বিউটি প্রোডাক্ট কিনুন দ্রুত এবং নিরাপদে।",
      buttonText: "শপিং শুরু করুন",
      features: ["নিরাপদ পেমেন্ট", "বিশাল পণ্যের সংগ্রহ", "২৪/৭ সাপোর্ট"],
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1522108098940-de49801b5b40?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "আপনার জন্য ব্যক্তিগতকৃত বিউটি সমাধান",
      subtitle: "আপনার চাহিদা অনুযায়ী পণ্য",
      description:
        "আমাদের ডেটা-চালিত সুপারিশের মাধ্যমে আপনার ত্বক ও চুলের জন্য সঠিক পণ্য নির্বাচন করুন।",
      buttonText: "বেছে নিন",
      features: ["ব্যক্তিগতকৃত সুপারিশ", "বিশেষজ্ঞ পরামর্শ", "সহজ ফিল্টারিং"],
    },
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Auto slide
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
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
          setIsPlaying((prev) => !prev);
          break;
        case "Escape":
          setIsPlaying(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [nextSlide, prevSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black mt-12">
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
                    <CheckCircle2 className="w-5 h-5 text-primary" />
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
                  className="bg-primary hover:bg-primary-hover transition-colors duration-200"
                >
                  <span>{currentSlideData.buttonText}</span>
                </Button>

                <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300">
                  সব পণ্য দেখুন
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
        onClick={() => setIsPlaying((prev) => !prev)}
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
              <div className="w-12 h-2 rounded-full bg-primary/30 overflow-hidden">
                <div
                  className={`h-full bg-primary transition-all duration-300 ${
                    index === currentSlide ? "w-full" : "w-0"
                  }`}
                />
              </div>
              {index === currentSlide && (
                <div
                  className="absolute -top-1 left-0 w-full h-4 bg-primary/50 rounded-full animate-pulse"
                  style={{
                    animation: "progress 5s linear infinite",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
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
