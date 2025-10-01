import type { StatsConfig } from "@/lib/sectionTemplates";
import { Card } from "@/components/ui/card";

interface StatsSectionProps {
  config: StatsConfig;
}

export function StatsSection({ config }: StatsSectionProps) {
  return (
    <div className="py-16 px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">{config.heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {config.stats.map((stat, index) => (
            <Card key={index} className="p-8 text-center">
              <div className="text-5xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-xl font-semibold mb-2">{stat.label}</div>
              {stat.description && (
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
