import { SEOMetadata } from "./common";

export interface Brand {
  id: string;
  name: string;
  logo: string;
  slug: string;
  description?: string;
  productCount?: number;
  seo?: SEOMetadata;
}
