import { NextRequest, NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

// Lighting style prompts
const lightingStylePrompts: Record<string, string> = {
  architectural: `Add professional architectural uplighting to this home exterior.
    Install warm amber LED uplights (2700K-3000K color temperature) positioned at the base of the home,
    aimed upward to highlight the home's facade, columns, and architectural features.
    The lights should cast a warm, inviting glow that accentuates textures and creates dramatic shadows.
    Make it look like a professional landscape lighting installation, photorealistic and natural.
    The scene should be at dusk or nighttime with the sky showing deep blue tones.`,

  pathway: `Add professional path and walkway lighting to this home exterior.
    Install low-voltage LED path lights along walkways, driveways, and garden borders.
    Use warm amber fixtures (2700K-3000K) spaced evenly, creating pools of light that guide visitors.
    The lights should illuminate the path while creating an elegant, welcoming atmosphere.
    Make it look like a professional landscape lighting installation, photorealistic and natural.
    The scene should be at dusk or nighttime.`,

  garden: `Add professional garden and plant highlighting to this home exterior.
    Install accent lights to highlight trees, shrubs, and landscaping features.
    Use uplights at the base of trees to create dramatic silhouettes and moonlighting effects.
    Add spotlights to showcase specimen plants and garden focal points.
    Use warm amber LED lights (2700K-3000K) for a natural, inviting look.
    Make it look like a professional landscape lighting installation, photorealistic and natural.
    The scene should be at dusk or nighttime.`,

  outdoor_living: `Add professional outdoor living space lighting to this home exterior.
    Install ambient lighting for patios, decks, and outdoor entertaining areas.
    Include string lights, recessed deck lights, and wall-mounted fixtures.
    Add task lighting for outdoor kitchens or seating areas.
    Use warm white LED lights (2700K-3000K) to create a cozy, inviting atmosphere.
    Make it look like a professional landscape lighting installation, photorealistic and natural.
    The scene should be at dusk or nighttime.`,

  security: `Add professional security and flood lighting to this home exterior.
    Install motion-activated LED floodlights at key entry points.
    Add continuous low-level perimeter lighting for visibility.
    Use a mix of warm white accent lights and brighter security fixtures.
    Ensure all dark corners and entry points are well-illuminated.
    Make it look like a professional landscape lighting installation, photorealistic and natural.
    The scene should be at dusk or nighttime.`,

  combination: `Add a comprehensive professional landscape lighting design to this home exterior.
    Include ALL of the following elements:
    1. Architectural uplighting on the home's facade with warm amber LEDs
    2. Path lights along walkways and driveways
    3. Garden accent lights highlighting trees and landscaping
    4. Ambient lighting for outdoor living spaces
    5. Subtle security lighting at entry points
    Use warm color temperatures (2700K-3000K) throughout for a cohesive look.
    Create depth with layers of light - ambient, task, and accent lighting.
    Make it look like a premium professional landscape lighting installation, photorealistic and natural.
    The scene should be at dusk or nighttime with dramatic blue sky tones.`,
};

export async function POST(request: NextRequest) {
  try {
    // Check for API key
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Gemini API key not configured. Please add GEMINI_API_KEY to your environment variables.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { image, style, mimeType } = body;

    // Validate input
    if (!image) {
      return NextResponse.json(
        { success: false, message: "No image provided" },
        { status: 400 }
      );
    }

    if (!style || !lightingStylePrompts[style]) {
      return NextResponse.json(
        { success: false, message: "Invalid lighting style selected" },
        { status: 400 }
      );
    }

    // Get the prompt for the selected style
    const prompt = lightingStylePrompts[style];

    // Initialize Google provider for Vercel AI Gateway
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // Use Gemini 2.5 Flash via Vercel AI SDK
    const result = await generateText({
      model: google("gemini-2.5-flash-preview-05-20"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are a professional landscape lighting visualization expert.

              Analyze this home exterior image and create a detailed description of how the following lighting design would transform it:

              ${prompt}

              Provide a vivid, detailed description of:
              1. Where each light fixture would be placed
              2. How the light would fall on the architecture and landscaping
              3. The overall ambiance and mood created
              4. Specific features that would be highlighted

              Make the description so vivid that the homeowner can visualize exactly how their home would look with professional landscape lighting installed.`,
            },
            {
              type: "image",
              image: `data:${mimeType || "image/jpeg"};base64,${image}`,
            },
          ],
        },
      ],
    });

    // Return the text description since image generation isn't supported
    return NextResponse.json({
      success: true,
      resultImage: null,
      textDescription: result.text,
      message: "Analysis complete! Here's how your home would look with professional landscape lighting:",
    });
  } catch (error) {
    console.error("Visualizer API error:", error);

    // Handle specific error types
    if (error instanceof Error) {
      console.error("Full error:", error.message);

      if (error.message.includes("quota")) {
        return NextResponse.json(
          {
            success: false,
            message:
              "API quota exceeded. Please try again later or contact us for a free in-person demonstration.",
          },
          { status: 429 }
        );
      }

      if (error.message.includes("API key")) {
        return NextResponse.json(
          {
            success: false,
            message: "API configuration error. Please contact support.",
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        message:
          "An error occurred while processing your image. Please try again or contact us for a free demonstration.",
      },
      { status: 500 }
    );
  }
}
