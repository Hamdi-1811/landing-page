import { useState, useEffect } from "react";
import { EditorToolbar } from "@/components/EditorToolbar";
import { SectionListItem } from "@/components/SectionListItem";
import { BrandKit } from "@/components/BrandKit";
import { AIChat } from "@/components/AIChat";
import { PreviewFrame } from "@/components/PreviewFrame";
import { DynamicRenderer } from "@/components/DynamicRenderer";
import { AddSectionDialog } from "@/components/AddSectionDialog";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Project, Section } from "@shared/schema";
import { useParams } from "wouter";
import { getSectionTemplate } from "@/lib/sectionTemplates";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Editor() {
  const { toast } = useToast();
  const params = useParams();
  const projectId = parseInt(params.id || "0");

  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [chatOpen, setChatOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [addSectionOpen, setAddSectionOpen] = useState(false);

  const { data: project, isLoading: projectLoading } = useQuery<Project>({
    queryKey: ["/api/projects", projectId],
    queryFn: () => fetch(`/api/projects/${projectId}`).then(r => r.json()),
    enabled: projectId > 0,
  });

  const { data: sections = [], isLoading: sectionsLoading } = useQuery<Section[]>({
    queryKey: ["/api/projects", projectId, "sections"],
    queryFn: () => fetch(`/api/projects/${projectId}/sections`).then(r => r.json()),
    enabled: projectId > 0,
  });

  useEffect(() => {
    if (sections.length > 0 && activeSection === null) {
      setActiveSection(sections[0].id);
    }
  }, [sections, activeSection]);

  const updateProjectMutation = useMutation({
    mutationFn: async (data: Partial<Project>) => {
      const res = await apiRequest("PATCH", `/api/projects/${projectId}`, data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects", projectId] });
      toast({
        title: "Saved",
        description: "Your changes have been saved.",
      });
    },
  });

  const updateSectionMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Section> }) => {
      const res = await apiRequest("PATCH", `/api/sections/${id}`, data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects", projectId, "sections"] });
    },
  });

  const deleteSectionMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/sections/${id}`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects", projectId, "sections"] });
      toast({
        title: "Section deleted",
        description: "The section has been removed.",
      });
    },
  });

  const addSectionMutation = useMutation({
    mutationFn: async (type: string) => {
      const maxOrder = sections.length > 0 ? Math.max(...sections.map((s) => s.order)) : -1;
      const config = getSectionTemplate(type);
      const label = type.charAt(0).toUpperCase() + type.slice(1) + " Section";

      const res = await apiRequest("POST", `/api/projects/${projectId}/sections`, {
        type,
        label,
        config,
        order: maxOrder + 1,
        isVisible: 1,
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects", projectId, "sections"] });
      toast({
        title: "Section added",
        description: "New section has been created.",
      });
    },
  });

  const aiEditMutation = useMutation({
    mutationFn: async ({ sectionId, request }: { sectionId: number; request: string }) => {
      const res = await apiRequest("POST", "/api/ai/edit-section", { sectionId, request });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects", projectId, "sections"] });
      toast({
        title: "AI Edit Applied",
        description: "Your section has been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to apply AI edit. Please try again.",
        variant: "destructive",
      });
    },
  });

  const toggleSectionVisibility = (id: number) => {
    const section = sections.find((s) => s.id === id);
    if (section) {
      updateSectionMutation.mutate({
        id,
        data: { isVisible: section.isVisible ? 0 : 1 },
      });
    }
  };

  const handleAIMessage = (message: string) => {
    if (!activeSection) {
      toast({
        title: "No section selected",
        description: "Please select a section to edit.",
        variant: "destructive",
      });
      return;
    }

    aiEditMutation.mutate({
      sectionId: activeSection,
      request: message,
    });
  };

  if (projectLoading || sectionsLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Project not found</h2>
          <p className="text-muted-foreground">This project does not exist.</p>
        </div>
      </div>
    );
  }

  const brandKit = (project.brandKit || {}) as any;

  return (
    <div className="h-screen flex flex-col bg-background">
      <EditorToolbar
        projectName={project.name}
        onProjectNameChange={(name) => updateProjectMutation.mutate({ name })}
        onPreview={() => toast({ title: "Preview mode", description: "Opening preview..." })}
        onExport={() => toast({ title: "Exporting", description: "Preparing download..." })}
        onSave={() => updateProjectMutation.mutate({})}
        deviceMode={deviceMode}
        onDeviceModeChange={setDeviceMode}
      />

      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 border-r border-border bg-sidebar flex flex-col">
          <Tabs defaultValue="sections" className="flex-1 flex flex-col">
            <TabsList className="w-full rounded-none border-b">
              <TabsTrigger value="sections" className="flex-1" data-testid="tab-sections">
                Sections
              </TabsTrigger>
              <TabsTrigger value="brand" className="flex-1" data-testid="tab-brand">
                Brand Kit
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sections" className="flex-1 flex flex-col m-0 p-0">
              <div className="p-4 border-b border-border">
                <Button 
                  className="w-full" 
                  onClick={() => setAddSectionOpen(true)}
                  data-testid="button-add-section"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Section
                </Button>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-4 space-y-2">
                  {sections.map((section) => (
                    <SectionListItem
                      key={section.id}
                      id={section.id.toString()}
                      type={section.type}
                      label={section.label}
                      isVisible={section.isVisible === 1}
                      isActive={activeSection === section.id}
                      onClick={() => setActiveSection(section.id)}
                      onToggleVisibility={() => toggleSectionVisibility(section.id)}
                      onDuplicate={() => {
                        toast({ title: "Feature coming soon", description: "Section duplication will be available soon." });
                      }}
                      onDelete={() => deleteSectionMutation.mutate(section.id)}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="brand" className="flex-1 m-0 overflow-auto">
              <BrandKit
                logo={brandKit.logo}
                primaryColor={brandKit.primaryColor || "#8b5cf6"}
                secondaryColor={brandKit.secondaryColor || "#10b981"}
                onLogoUpload={(file) => {
                  toast({ title: "Feature coming soon", description: "Logo upload will be available soon." });
                }}
                onLogoRemove={() => {
                  toast({ title: "Logo removed" });
                }}
                onPrimaryColorChange={(color) => {
                  updateProjectMutation.mutate({
                    brandKit: { ...brandKit, primaryColor: color },
                  });
                }}
                onSecondaryColorChange={(color) => {
                  updateProjectMutation.mutate({
                    brandKit: { ...brandKit, secondaryColor: color },
                  });
                }}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className={`flex-1 overflow-hidden ${chatOpen ? 'h-[60%]' : 'h-full'}`}>
            <PreviewFrame deviceMode={deviceMode}>
              <DynamicRenderer sections={sections} />
            </PreviewFrame>
          </div>

          <Collapsible open={chatOpen} onOpenChange={setChatOpen}>
            <div className="border-t border-border">
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full h-8 rounded-none border-b border-border"
                  data-testid="button-toggle-chat"
                >
                  {chatOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="h-80">
                  <AIChat
                    onSendMessage={handleAIMessage}
                    onFileUpload={(file) => {
                      toast({ title: "Feature coming soon", description: "File upload will be available soon." });
                    }}
                  />
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      </div>

      <AddSectionDialog
        open={addSectionOpen}
        onOpenChange={setAddSectionOpen}
        onSelectSection={(type) => addSectionMutation.mutate(type)}
      />
    </div>
  );
}
