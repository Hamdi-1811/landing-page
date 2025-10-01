import { Button } from "@/components/ui/button";
import { Monitor, Tablet, Smartphone, Download, Eye, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EditorToolbarProps {
  projectName: string;
  onProjectNameChange: (name: string) => void;
  onPreview: () => void;
  onExport: () => void;
  onSave: () => void;
  deviceMode: "desktop" | "tablet" | "mobile";
  onDeviceModeChange: (mode: "desktop" | "tablet" | "mobile") => void;
}

export function EditorToolbar({
  projectName,
  onProjectNameChange,
  onPreview,
  onExport,
  onSave,
  deviceMode,
  onDeviceModeChange,
}: EditorToolbarProps) {
  return (
    <div className="h-14 border-b border-border bg-background flex items-center justify-between px-4 gap-4">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <Input
          value={projectName}
          onChange={(e) => onProjectNameChange(e.target.value)}
          className="max-w-xs border-0 focus-visible:ring-0 font-semibold"
          data-testid="input-project-name"
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 mr-2">
          <Button
            size="icon"
            variant={deviceMode === "desktop" ? "secondary" : "ghost"}
            onClick={() => onDeviceModeChange("desktop")}
            data-testid="button-device-desktop"
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant={deviceMode === "tablet" ? "secondary" : "ghost"}
            onClick={() => onDeviceModeChange("tablet")}
            data-testid="button-device-tablet"
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant={deviceMode === "mobile" ? "secondary" : "ghost"}
            onClick={() => onDeviceModeChange("mobile")}
            data-testid="button-device-mobile"
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>

        <Button variant="ghost" onClick={onSave} data-testid="button-save">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>

        <Button variant="outline" onClick={onPreview} data-testid="button-preview">
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button data-testid="button-export">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onExport} data-testid="button-export-html">
              Export as HTML
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onExport} data-testid="button-export-zip">
              Export as ZIP
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
