import { Testimonial } from "@/lip/types/testimonials";
import { Star, X } from "lucide-react";
import Image from "next/image";

const VideoModal: React.FC<{
  testimonial: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ testimonial, isOpen, onClose }) => {
  if (!isOpen || !testimonial) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                <p className="text-pink-600 text-sm">{testimonial.location}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-6">
            <video
              controls
              className="w-full h-full object-cover"
              poster={testimonial.videoThumbnail}
            >
              <source src={testimonial.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < testimonial.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-700 text-lg italic mb-4">
              {testimonial.comment}
            </p>
            <div className="flex justify-center gap-4">
              <span className="bg-pink-50 text-pink-700 px-4 py-2 rounded-full font-medium">
                {testimonial.product}
              </span>
              <span className="bg-gray-50 text-gray-600 px-4 py-2 rounded-full">
                {testimonial.skinType}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VideoModal;
