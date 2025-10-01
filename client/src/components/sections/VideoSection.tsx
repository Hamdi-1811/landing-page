import type { VideoConfig } from "@/lib/sectionTemplates";

interface VideoSectionProps {
  config: VideoConfig;
}

export function VideoSection({ config }: VideoSectionProps) {
  return (
    <div className="py-16 px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">{config.heading}</h2>
        {config.description && (
          <p className="text-xl text-center text-muted-foreground mb-8">{config.description}</p>
        )}
        <div className="aspect-video rounded-lg overflow-hidden bg-black">
          <iframe
            src={`${config.videoUrl}${config.autoplay ? '?autoplay=1' : ''}`}
            title={config.heading}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
