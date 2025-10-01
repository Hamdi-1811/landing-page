import type { TextConfig } from "@/lib/sectionTemplates";

interface TextSectionProps {
  config: TextConfig;
}

export function TextSection({ config }: TextSectionProps) {
  const alignmentClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[config.alignment || "left"];

  return (
    <div className="py-16 px-8 bg-background">
      <div className={`max-w-4xl mx-auto ${alignmentClass}`}>
        <h2 className="text-4xl font-bold mb-8">{config.heading}</h2>
        <div className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
          {config.content}
        </div>
      </div>
    </div>
  );
}
