import type { Section } from "@shared/schema";
import { HeroSection } from "./sections/HeroSection";
import { StatsSection } from "./sections/StatsSection";
import { ProductsSection } from "./sections/ProductsSection";
import { VideoSection } from "./sections/VideoSection";
import { GallerySection } from "./sections/GallerySection";
import { TextSection } from "./sections/TextSection";

interface DynamicRendererProps {
  sections: Section[];
}

export function DynamicRenderer({ sections }: DynamicRendererProps) {
  const renderSection = (section: Section) => {
    if (section.isVisible === 0) return null;

    const config = section.config as any;

    switch (section.type) {
      case "hero":
        return <HeroSection key={section.id} config={config} />;
      case "stats":
        return <StatsSection key={section.id} config={config} />;
      case "products":
        return <ProductsSection key={section.id} config={config} />;
      case "video":
        return <VideoSection key={section.id} config={config} />;
      case "gallery":
        return <GallerySection key={section.id} config={config} />;
      case "text":
        return <TextSection key={section.id} config={config} />;
      default:
        return (
          <div key={section.id} className="py-16 px-8 bg-muted/30 text-center">
            <p className="text-muted-foreground">Unknown section type: {section.type}</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {sections.map((section) => renderSection(section))}
    </div>
  );
}
