import OpenAI from "openai";

function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY not configured");
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

interface SectionConfig {
  [key: string]: any;
}

export async function editSectionWithAI(
  sectionType: string,
  currentConfig: SectionConfig,
  userRequest: string
): Promise<SectionConfig> {
  const systemPrompt = `You are an AI assistant that helps edit landing page sections based on natural language requests.
You receive a section configuration as JSON and a user's editing request.
You must return ONLY a valid JSON object with the updated configuration.

Section type: ${sectionType}

Current configuration format depends on the section type:
- hero: { title, subtitle, backgroundType, backgroundColor, backgroundImage, ctaText, ctaUrl }
- stats: { heading, stats: [{ label, value, description }] }
- products: { heading, products: [{ name, description, image, price }] }
- video: { heading, videoUrl, thumbnail, autoplay }
- gallery: { heading, images: [{ url, caption }] }
- text: { heading, content, alignment }

Rules:
1. Only modify properties mentioned in the user's request
2. Keep all other properties unchanged
3. Return valid JSON only, no markdown or explanations
4. Use sensible defaults if creating new properties`;

  const userPrompt = `Current configuration:
${JSON.stringify(currentConfig, null, 2)}

User request: ${userRequest}

Return the updated configuration as JSON:`;

  try {
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error("No response from AI");
    }

    const updatedConfig = JSON.parse(responseContent);
    return updatedConfig;
  } catch (error) {
    console.error("AI editing error:", error);
    throw new Error("Failed to process AI editing request");
  }
}

export async function generateSectionContent(
  sectionType: string,
  brandKit: { primaryColor?: string; secondaryColor?: string; logo?: string },
  context?: string
): Promise<SectionConfig> {
  const systemPrompt = `You are an AI assistant that generates landing page section content.
Generate professional, engaging content for a ${sectionType} section.

Brand context:
- Primary color: ${brandKit.primaryColor || "#8b5cf6"}
- Secondary color: ${brandKit.secondaryColor || "#10b981"}
${context ? `- Additional context: ${context}` : ""}

Return ONLY valid JSON with appropriate fields for this section type.`;

  try {
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Generate content for a ${sectionType} section` },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error("No response from AI");
    }

    return JSON.parse(responseContent);
  } catch (error) {
    console.error("Content generation error:", error);
    throw new Error("Failed to generate section content");
  }
}
