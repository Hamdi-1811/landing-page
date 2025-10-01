import { Button } from "@/components/ui/button";
import type { HeroConfig } from "@/lib/sectionTemplates";

interface HeroSectionProps {
  config: HeroConfig;
}

export function HeroSection({ config }: HeroSectionProps) {
  const getBackgroundStyle = () => {
    if (config.backgroundType === "gradient" && config.backgroundGradient) {
      return { background: config.backgroundGradient };
    }
    if (config.backgroundType === "color" && config.backgroundColor) {
      return { backgroundColor: config.backgroundColor };
    }
    if (config.backgroundType === "image" && config.backgroundImage) {
      return {
        backgroundImage: `url(${config.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }
    return { background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" };
  };

  const alignmentClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[config.alignment || "center"];

  return (
    <div
      className={`relative min-h-96 flex flex-col justify-center px-8 py-16 text-white ${alignmentClass}`}
      style={getBackgroundStyle()}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <h1 className="text-5xl font-bold mb-4">{config.title}</h1>
        <p className="text-xl mb-8 text-white/90">{config.subtitle}</p>
        {config.ctaText && (
          <Button size="lg" className="bg-white text-black hover:bg-white/90">
            {config.ctaText}
          </Button>
        )}
      </div>
    </div>
  );
}
