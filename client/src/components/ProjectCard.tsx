import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, ExternalLink } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ProjectCardProps {
  id: string;
  name: string;
  thumbnail?: string;
  lastEdited: string;
  onOpen: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onExport: () => void;
}

export function ProjectCard({
  name,
  thumbnail,
  lastEdited,
  onOpen,
  onDelete,
  onDuplicate,
  onExport,
}: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-200">
      <div 
        className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 cursor-pointer"
        onClick={onOpen}
        data-testid={`card-project-${name.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {thumbnail ? (
          <img src={thumbnail} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl font-bold text-white/10">{name[0]}</div>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink className="w-4 h-4 text-white drop-shadow-lg" />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base truncate" data-testid="text-project-name">{name}</h3>
            <p className="text-sm text-muted-foreground mt-1">Edited {lastEdited}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" data-testid="button-project-menu">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onOpen} data-testid="button-open-project">
                Open
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDuplicate} data-testid="button-duplicate-project">
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onExport} data-testid="button-export-project">
                Export
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-destructive" data-testid="button-delete-project">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
}
