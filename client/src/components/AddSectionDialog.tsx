import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SectionTemplate {
  type: string;
  label: string;
  icon: string;
  description: string;
}

const sectionTypes: SectionTemplate[] = [
  { type: "hero", label: "Hero Section", icon: "🎯", description: "Large header with title and call-to-action" },
  { type: "stats", label: "Statistics", icon: "📊", description: "Display key metrics and numbers" },
  { type: "products", label: "Products", icon: "🎁", description: "Showcase your products or services" },
  { type: "video", label: "Video", icon: "📹", description: "Embed videos from YouTube or Vimeo" },
  { type: "gallery", label: "Gallery", icon: "🖼️", description: "Image gallery with captions" },
  { type: "text", label: "Text Content", icon: "📝", description: "Rich text content section" },
];

interface AddSectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectSection: (type: string) => void;
}

export function AddSectionDialog({ open, onOpenChange, onSelectSection }: AddSectionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Section</DialogTitle>
          <DialogDescription>Choose a section type to add to your presentation</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-96">
          <div className="grid grid-cols-2 gap-4 p-1">
            {sectionTypes.map((section) => (
              <Button
                key={section.type}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start gap-2 hover-elevate"
                onClick={() => {
                  onSelectSection(section.type);
                  onOpenChange(false);
                }}
                data-testid={`button-add-${section.type}`}
              >
                <div className="flex items-center gap-2 w-full">
                  <span className="text-2xl">{section.icon}</span>
                  <span className="font-semibold">{section.label}</span>
                </div>
                <p className="text-xs text-muted-foreground text-left">{section.description}</p>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
