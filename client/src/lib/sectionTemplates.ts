export interface HeroConfig {
  title: string;
  subtitle: string;
  backgroundType: "gradient" | "color" | "image";
  backgroundColor?: string;
  backgroundGradient?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaUrl?: string;
  alignment: "left" | "center" | "right";
}

export interface StatsConfig {
  heading: string;
  stats: Array<{
    label: string;
    value: string;
    description?: string;
  }>;
}

export interface ProductsConfig {
  heading: string;
  products: Array<{
    name: string;
    description: string;
    image?: string;
    price?: string;
  }>;
}

export interface VideoConfig {
  heading: string;
  videoUrl: string;
  thumbnail?: string;
  autoplay: boolean;
  description?: string;
}

export interface GalleryConfig {
  heading: string;
  images: Array<{
    url: string;
    caption?: string;
  }>;
  columns: number;
}

export interface TextConfig {
  heading: string;
  content: string;
  alignment: "left" | "center" | "right";
}

export type SectionConfig =
  | HeroConfig
  | StatsConfig
  | ProductsConfig
  | VideoConfig
  | GalleryConfig
  | TextConfig;

export const sectionTemplates: Record<string, any> = {
  hero: {
    title: "Welcome to Our Presentation",
    subtitle: "Create stunning landing pages with AI assistance",
    backgroundType: "gradient",
    backgroundGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    alignment: "center",
    ctaText: "Get Started",
    ctaUrl: "#",
  },
  stats: {
    heading: "Key Statistics",
    stats: [
      {
        label: "Customers",
        value: "10,000+",
        description: "Active users worldwide",
      },
      {
        label: "Projects",
        value: "50,000+",
        description: "Successfully completed",
      },
      {
        label: "Satisfaction",
        value: "99%",
        description: "Customer satisfaction rate",
      },
    ],
  },
  products: {
    heading: "Our Products",
    products: [
      {
        name: "Product One",
        description: "High-quality solution for your needs",
        price: "$99",
      },
      {
        name: "Product Two",
        description: "Premium features and support",
        price: "$199",
      },
      {
        name: "Product Three",
        description: "Enterprise-grade platform",
        price: "$299",
      },
    ],
  },
  video: {
    heading: "Watch Our Demo",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    autoplay: false,
    description: "See how our platform works in action",
  },
  gallery: {
    heading: "Photo Gallery",
    images: [
      { url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe", caption: "Image 1" },
      { url: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead", caption: "Image 2" },
      { url: "https://images.unsplash.com/photo-1618004912476-29818d81ae2e", caption: "Image 3" },
      { url: "https://images.unsplash.com/photo-1617957738682-9fdf76736e9e", caption: "Image 4" },
    ],
    columns: 2,
  },
  text: {
    heading: "About Us",
    content: "We are dedicated to creating the best presentation tools for businesses worldwide. Our platform combines powerful features with an intuitive interface to help you create stunning landing pages in minutes.",
    alignment: "left",
  },
};

export function getSectionTemplate(type: string): any {
  return sectionTemplates[type] || {};
}
