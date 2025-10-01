import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { NewProjectCard } from "@/components/NewProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Project } from "@shared/schema";
import { useLocation } from "wouter";
import { formatDistanceToNow } from "date-fns";

export default function Dashboard() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const createProjectMutation = useMutation({
    mutationFn: async (name: string) => {
      const res = await apiRequest("POST", "/api/projects", {
        name,
        brandKit: {
          primaryColor: "#8b5cf6",
          secondaryColor: "#10b981",
        },
      });
      return await res.json();
    },
    onSuccess: (data: Project) => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Project created",
        description: "Your presentation is ready to edit!",
      });
      setLocation(`/editor/${data.id}`);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/projects/${id}`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Project deleted",
        description: "The project has been removed.",
      });
    },
  });

  const handleCreateProject = () => {
    const name = `Presentation ${new Date().toLocaleDateString()}`;
    createProjectMutation.mutate(name);
  };

  const handleOpenProject = (id: number) => {
    setLocation(`/editor/${id}`);
  };

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold font-display flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                Presentation Builder
              </h1>
              <p className="text-muted-foreground mt-1">
                Create stunning landing pages with AI assistance
              </p>
            </div>
            <Button onClick={handleCreateProject} size="lg" data-testid="button-create-new">
              <Sparkles className="w-4 h-4 mr-2" />
              New Presentation
            </Button>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-projects"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <NewProjectCard onClick={handleCreateProject} />
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id.toString()}
                name={project.name}
                thumbnail={project.thumbnail || undefined}
                lastEdited={formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}
                onOpen={() => handleOpenProject(project.id)}
                onDelete={() => deleteProjectMutation.mutate(project.id)}
                onDuplicate={() => {
                  toast({
                    title: "Feature coming soon",
                    description: "Project duplication will be available soon.",
                  });
                }}
                onExport={() => {
                  toast({
                    title: "Feature coming soon",
                    description: "Export functionality will be available soon.",
                  });
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
