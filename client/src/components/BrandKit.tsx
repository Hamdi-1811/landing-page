import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { Card } from "@/components/ui/card";

interface BrandKitProps {
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  onLogoUpload: (file: File) => void;
  onLogoRemove: () => void;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
}

export function BrandKit({
  logo,
  primaryColor,
  secondaryColor,
  onLogoUpload,
  onLogoRemove,
  onPrimaryColorChange,
  onSecondaryColorChange,
}: BrandKitProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onLogoUpload(file);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="font-semibold mb-4">Brand Assets</h3>
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm mb-2 block">Logo</Label>
            {logo ? (
              <Card className="relative p-4">
                <img src={logo} alt="Logo" className="max-h-24 mx-auto" />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={onLogoRemove}
                  data-testid="button-remove-logo"
                >
                  <X className="w-4 h-4" />
                </Button>
              </Card>
            ) : (
              <div>
                <input
                  type="file"
                  id="logo-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => document.getElementById("logo-upload")?.click()}
                  data-testid="button-upload-logo"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Logo
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primary-color" className="text-sm mb-2 block">
                Primary Color
              </Label>
              <div className="flex gap-2">
                <div
                  className="w-10 h-10 rounded-md border border-border cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                  onClick={() => document.getElementById("primary-color")?.click()}
                  data-testid="color-primary-preview"
                />
                <div className="flex-1">
                  <Input
                    id="primary-color"
                    type="color"
                    value={primaryColor}
                    onChange={(e) => onPrimaryColorChange(e.target.value)}
                    className="h-10 cursor-pointer"
                    data-testid="input-primary-color"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="secondary-color" className="text-sm mb-2 block">
                Secondary Color
              </Label>
              <div className="flex gap-2">
                <div
                  className="w-10 h-10 rounded-md border border-border cursor-pointer"
                  style={{ backgroundColor: secondaryColor }}
                  onClick={() => document.getElementById("secondary-color")?.click()}
                  data-testid="color-secondary-preview"
                />
                <div className="flex-1">
                  <Input
                    id="secondary-color"
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => onSecondaryColorChange(e.target.value)}
                    className="h-10 cursor-pointer"
                    data-testid="input-secondary-color"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
