import type { GalleryConfig } from "@/lib/sectionTemplates";

interface GallerySectionProps {
  config: GalleryConfig;
}

export function GallerySection({ config }: GallerySectionProps) {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-4",
  }[config.columns] || "grid-cols-2";

  return (
    <div className="py-16 px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">{config.heading}</h2>
        <div className={`grid ${gridClass} gap-6`}>
          {config.images.map((image, index) => (
            <div key={index} className="group relative aspect-square overflow-hidden rounded-lg">
              <img
                src={image.url}
                alt={image.caption || `Image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 text-center">
                  {image.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
