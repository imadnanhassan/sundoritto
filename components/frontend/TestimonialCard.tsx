import { Testimonial } from "@/lip/types/testimonials";
import { Play, Quote, Star } from "lucide-react";
import Image from "next/image";

const TestimonialCard: React.FC<{
  testimonial: Testimonial;
  onVideoClick: (testimonial: Testimonial) => void;
}> = ({ testimonial, onVideoClick }) => {
  return (
    <div className="bg-white rounded shadow-lg overflow-hidden transform transition-all duration-300 ">
      {testimonial.type === "video" && (
        <div className="relative">
          <video
            src={testimonial.videoThumbnail}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />

          <button
            onClick={() => onVideoClick(testimonial)}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-all duration-300 group"
          >
            <div className="bg-white rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 text-pink-600 ml-1" />
            </div>
          </button>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center mb-4">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            width={56}
            height={56}
            className="w-14 h-14 rounded-full mr-4 border-2 border-pink-100"
          />
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 text-lg">
              {testimonial.name}
            </h4>
            <p className="text-pink-600 text-sm font-medium">
              {testimonial.location}
            </p>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < testimonial.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative mb-4">
          <Quote className="absolute -top-2 -left-2 w-8 h-8 text-pink-200" />
          <p className="text-gray-700 leading-relaxed pl-6 italic">
            {testimonial.comment}
          </p>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between text-sm">
            <span className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full font-medium">
              {testimonial.product}
            </span>
            <span className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full">
              {testimonial.skinType}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
