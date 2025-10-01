import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "./db";
import { projects, sections, insertProjectSchema, insertSectionSchema, updateProjectSchema, updateSectionSchema } from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { editSectionWithAI, generateSectionContent } from "./ai";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/projects", async (req, res) => {
    try {
      const userId = "demo-user";
      const allProjects = await db
        .select()
        .from(projects)
        .where(eq(projects.userId, userId))
        .orderBy(desc(projects.updatedAt));

      res.json(allProjects);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const userId = "demo-user";
      const validatedData = insertProjectSchema.parse({
        ...req.body,
        userId,
      });

      const [project] = await db
        .insert(projects)
        .values(validatedData)
        .returning();

      const defaultSections = [
        { type: "hero", label: "Hero Section", order: 0, config: { title: "Welcome", subtitle: "Build amazing presentations" } },
      ];

      for (const section of defaultSections) {
        await db.insert(sections).values({
          projectId: project.id,
          ...section,
        });
      }

      res.json(project);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const [project] = await db
        .select()
        .from(projects)
        .where(eq(projects.id, projectId));

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      res.json(project);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const validatedData = updateProjectSchema.parse(req.body);
      
      const [updated] = await db
        .update(projects)
        .set({ ...validatedData, updatedAt: new Date() })
        .where(eq(projects.id, projectId))
        .returning();

      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      
      await db.delete(sections).where(eq(sections.projectId, projectId));
      await db.delete(projects).where(eq(projects.id, projectId));

      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/projects/:id/sections", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const projectSections = await db
        .select()
        .from(sections)
        .where(eq(sections.projectId, projectId))
        .orderBy(sections.order);

      res.json(projectSections);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/projects/:id/sections", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const validatedData = insertSectionSchema.parse({
        ...req.body,
        projectId,
      });

      const [section] = await db
        .insert(sections)
        .values(validatedData)
        .returning();

      res.json(section);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/sections/:id", async (req, res) => {
    try {
      const sectionId = parseInt(req.params.id);
      const validatedData = updateSectionSchema.parse(req.body);
      
      const [updated] = await db
        .update(sections)
        .set({ ...validatedData, updatedAt: new Date() })
        .where(eq(sections.id, sectionId))
        .returning();

      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/sections/:id", async (req, res) => {
    try {
      const sectionId = parseInt(req.params.id);
      await db.delete(sections).where(eq(sections.id, sectionId));
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/ai/edit-section", async (req, res) => {
    try {
      const { sectionId, request } = req.body;

      if (!sectionId || !request) {
        return res.status(400).json({ error: "sectionId and request are required" });
      }

      const [section] = await db
        .select()
        .from(sections)
        .where(eq(sections.id, sectionId));

      if (!section) {
        return res.status(404).json({ error: "Section not found" });
      }

      const updatedConfig = await editSectionWithAI(
        section.type,
        section.config as any,
        request
      );

      const [updated] = await db
        .update(sections)
        .set({ config: updatedConfig, updatedAt: new Date() })
        .where(eq(sections.id, sectionId))
        .returning();

      res.json(updated);
    } catch (error: any) {
      if (error.message === "OPENAI_API_KEY not configured") {
        return res.status(503).json({ error: "AI service not available - API key not configured" });
      }
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/ai/generate-section", async (req, res) => {
    try {
      const { projectId, sectionType, context } = req.body;

      const [project] = await db
        .select()
        .from(projects)
        .where(eq(projects.id, projectId));

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      const config = await generateSectionContent(
        sectionType,
        project.brandKit as any,
        context
      );

      res.json({ config });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
