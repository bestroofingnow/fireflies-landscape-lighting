import { NextRequest, NextResponse } from "next/server";

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

    // Call Gemini API directly for image generation
    // Using gemini-2.0-flash-exp which supports image output
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: prompt },
                {
                  inlineData: {
                    mimeType: mimeType || "image/jpeg",
                    data: image,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            responseModalities: ["TEXT", "IMAGE"],
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    // Extract image from response
    const candidates = data.candidates;
    if (!candidates || candidates.length === 0) {
      return NextResponse.json(
        { success: false, message: "No response from AI model" },
        { status: 500 }
      );
    }

    const parts = candidates[0].content?.parts;
    if (!parts) {
      return NextResponse.json(
        { success: false, message: "No content in AI response" },
        { status: 500 }
      );
    }

    let resultImage: string | null = null;
    let textResponse: string | null = null;

    for (const part of parts) {
      if (part.inlineData) {
        resultImage = part.inlineData.data;
      }
      if (part.text) {
        textResponse = part.text;
      }
    }

    if (!resultImage) {
      return NextResponse.json(
        {
          success: false,
          message:
            textResponse ||
            "Could not generate image. Please try a different photo or style.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      resultImage,
      message: textResponse || "Visualization generated successfully!",
    });
  } catch (error) {
    console.error("Visualizer API error:", error);

    // Handle specific error types
    if (error instanceof Error) {
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

      if (error.message.includes("invalid")) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Invalid image format. Please upload a JPEG, PNG, or WebP image.",
          },
          { status: 400 }
        );
      }

      console.error("Full error:", error.message);
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
