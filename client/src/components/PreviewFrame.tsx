import { useState } from "react";

interface PreviewFrameProps {
  deviceMode: "desktop" | "tablet" | "mobile";
  children: React.ReactNode;
}

export function PreviewFrame({ deviceMode, children }: PreviewFrameProps) {
  const widthClass = {
    desktop: "w-full",
    tablet: "w-[768px]",
    mobile: "w-[375px]",
  }[deviceMode];

  return (
    <div className="w-full h-full bg-muted/30 flex items-start justify-center overflow-auto p-8">
      <div className={`${widthClass} transition-all duration-300 bg-background rounded-lg shadow-2xl overflow-hidden`}>
        <div className="relative">
          <div className="absolute top-2 right-2 z-10">
            <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white">
              {deviceMode}
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export function SamplePreview() {
  return (
    <div className="space-y-0">
      <div className="relative h-96 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center text-white">
        <div className="text-center px-8">
          <h1 className="text-5xl font-bold mb-4">Your Presentation Title</h1>
          <p className="text-xl text-white/80">A stunning landing page</p>
        </div>
      </div>
      <div className="p-12 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 bg-card rounded-lg border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg mb-4" />
                <h3 className="font-semibold mb-2">Feature {i}</h3>
                <p className="text-sm text-muted-foreground">Description of feature {i}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
