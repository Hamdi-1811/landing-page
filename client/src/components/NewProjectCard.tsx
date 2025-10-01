import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface NewProjectCardProps {
  onClick: () => void;
}

export function NewProjectCard({ onClick }: NewProjectCardProps) {
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover-elevate active-elevate-2 transition-all duration-200 border-dashed"
      onClick={onClick}
      data-testid="button-create-project"
    >
      <div className="aspect-video bg-card flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <Plus className="w-8 h-8 text-primary" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">New Project</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-base">Create Presentation</h3>
        <p className="text-sm text-muted-foreground mt-1">Start from scratch</p>
      </div>
    </Card>
  );
}
