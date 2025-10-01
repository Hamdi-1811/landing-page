import { Button } from "@/components/ui/button";
import { GripVertical, Eye, EyeOff, Copy, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SectionListItemProps {
  id: string;
  type: string;
  label: string;
  isVisible: boolean;
  isActive: boolean;
  onToggleVisibility: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onClick: () => void;
}

const sectionIcons: Record<string, string> = {
  hero: "🎯",
  stats: "📊",
  products: "🎁",
  video: "📹",
  gallery: "🖼️",
  text: "📝",
  comparison: "⚖️",
};

export function SectionListItem({
  id,
  type,
  label,
  isVisible,
  isActive,
  onToggleVisibility,
  onDuplicate,
  onDelete,
  onClick,
}: SectionListItemProps) {
  return (
    <div
      className={`group flex items-center gap-2 p-3 rounded-md cursor-pointer transition-colors ${
        isActive ? 'bg-sidebar-accent' : 'hover-elevate'
      }`}
      onClick={onClick}
      data-testid={`section-item-${id}`}
    >
      <Button size="icon" variant="ghost" className="h-6 w-6 cursor-grab" data-testid="button-drag-section">
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </Button>
      
      <div className="flex-1 flex items-center gap-2 min-w-0">
        <span className="text-lg">{sectionIcons[type] || "📄"}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{label}</p>
          <Badge variant="secondary" className="text-xs mt-0.5">{type}</Badge>
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7"
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility();
          }}
          data-testid="button-toggle-visibility"
        >
          {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7"
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate();
          }}
          data-testid="button-duplicate-section"
        >
          <Copy className="w-3.5 h-3.5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          data-testid="button-delete-section"
        >
          <Trash2 className="w-3.5 h-3.5 text-destructive" />
        </Button>
      </div>
    </div>
  );
}
