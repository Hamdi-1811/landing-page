import type { ProductsConfig } from "@/lib/sectionTemplates";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductsSectionProps {
  config: ProductsConfig;
}

export function ProductsSection({ config }: ProductsSectionProps) {
  return (
    <div className="py-16 px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">{config.heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {config.products.map((product, index) => (
            <Card key={index} className="p-6 flex flex-col">
              {product.image && (
                <div className="aspect-square bg-muted rounded-md mb-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
              <p className="text-muted-foreground mb-4 flex-1">{product.description}</p>
              {product.price && (
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <Button>Learn More</Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
