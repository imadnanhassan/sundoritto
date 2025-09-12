export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  type: "text" | "video";
  videoUrl?: string;
  videoThumbnail?: string;
  product: string;
  skinType: string;
}
