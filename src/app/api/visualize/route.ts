import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Lighting style prompts for image generation
const lightingStylePrompts: Record<string, string> = {
  architectural: `Edit this home exterior photo to add professional architectural uplighting.
    Add warm amber LED uplights (2700K-3000K color temperature) at the base of the home.
    The lights should cast upward beams that highlight the facade, columns, and architectural features.
    Add realistic warm glows, light pools, and subtle shadows.
    Make it look like a professional nighttime landscape lighting photo.
    The sky should be dark blue (dusk/night). Keep the home structure exactly the same.`,

  pathway: `Edit this home exterior photo to add professional path and walkway lighting.
    Add low-voltage LED path lights along walkways, driveways, and garden borders.
    Space the warm amber fixtures (2700K-3000K) evenly, creating pools of light.
    Add realistic glows around each path light fixture.
    Make it look like a professional nighttime landscape lighting photo.
    The sky should be dark blue (dusk/night). Keep the home structure exactly the same.`,

  garden: `Edit this home exterior photo to add professional garden and plant highlighting.
    Add accent uplights at the base of trees to create dramatic silhouettes.
    Add spotlights to showcase plants and landscaping features.
    Use warm amber LED lights (2700K-3000K) with realistic glow effects.
    Make it look like a professional nighttime landscape lighting photo.
    The sky should be dark blue (dusk/night). Keep the home structure exactly the same.`,

  outdoor_living: `Edit this home exterior photo to add professional outdoor living space lighting.
    Add ambient lighting for patios, decks, and entertaining areas.
    Include subtle string lights, recessed lights, and wall-mounted fixtures.
    Use warm white LED lights (2700K-3000K) to create a cozy atmosphere.
    Make it look like a professional nighttime landscape lighting photo.
    The sky should be dark blue (dusk/night). Keep the home structure exactly the same.`,

  security: `Edit this home exterior photo to add professional security lighting.
    Add well-placed LED floodlights at key entry points.
    Add continuous low-level perimeter lighting for visibility.
    Mix warm accent lights with brighter security fixtures.
    Make it look like a professional nighttime landscape lighting photo.
    The sky should be dark blue (dusk/night). Keep the home structure exactly the same.`,

  combination: `Edit this home exterior photo to add a comprehensive professional landscape lighting design.
    Include ALL of the following:
    1. Architectural uplighting on the home's facade with warm amber LEDs
    2. Path lights along walkways and driveways
    3. Garden accent lights highlighting trees and landscaping
    4. Ambient lighting for outdoor living spaces
    5. Subtle security lighting at entry points
    Use warm color temperatures (2700K-3000K) throughout.
    Add realistic glows, light beams, and subtle shadows.
    Make it look like a premium professional landscape lighting photo.
    The sky should be dark blue (dusk/night). Keep the home structure exactly the same.`,
};

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Google AI API key not configured. Please add GOOGLE_GENERATIVE_AI_API_KEY to your environment variables.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { image, style, mimeType } = body;

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

    const prompt = lightingStylePrompts[style];

    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(apiKey);

    // Use Gemini 2.0 Flash with image generation capabilities
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        // @ts-expect-error - responseModalities is supported but not in types yet
        responseModalities: ["Text", "Image"],
      },
    });

    // Prepare the image data
    const imagePart = {
      inlineData: {
        data: image,
        mimeType: mimeType || "image/jpeg",
      },
    };

    // Generate content with image editing
    const result = await model.generateContent([
      prompt,
      imagePart,
    ]);

    const response = result.response;

    // Check for generated image in the response
    let generatedImageBase64: string | null = null;
    let textDescription: string | null = null;

    if (response.candidates && response.candidates[0]) {
      const parts = response.candidates[0].content?.parts || [];

      for (const part of parts) {
        // Check for inline image data
        if ('inlineData' in part && part.inlineData) {
          generatedImageBase64 = part.inlineData.data;
        }
        // Check for text response
        if ('text' in part && part.text) {
          textDescription = part.text;
        }
      }
    }

    if (generatedImageBase64) {
      return NextResponse.json({
        success: true,
        resultImage: generatedImageBase64,
        textDescription: textDescription,
        message: "Your home with professional landscape lighting:",
      });
    }

    // If no image was generated, return the text description as fallback
    if (textDescription) {
      return NextResponse.json({
        success: true,
        resultImage: null,
        textDescription: textDescription,
        message: "Here's how your home would look with professional landscape lighting:",
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Unable to generate visualization. Please try again.",
      },
      { status: 500 }
    );

  } catch (error) {
    console.error("Visualizer API error:", error);

    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();
      console.error("Full error message:", error.message);

      if (errorMessage.includes("quota") || errorMessage.includes("rate limit")) {
        return NextResponse.json(
          {
            success: false,
            message:
              "API quota exceeded. Please try again later or contact us for a free in-person demonstration.",
          },
          { status: 429 }
        );
      }

      if (errorMessage.includes("api key") || errorMessage.includes("api_key") ||
          errorMessage.includes("invalid key") || errorMessage.includes("unauthorized")) {
        return NextResponse.json(
          {
            success: false,
            message: "API configuration error. Please ensure a valid Google AI API key is configured.",
          },
          { status: 500 }
        );
      }

      if (errorMessage.includes("not found") || errorMessage.includes("404")) {
        return NextResponse.json(
          {
            success: false,
            message: "AI model not available. Please try again later.",
          },
          { status: 500 }
        );
      }

      if (errorMessage.includes("safety") || errorMessage.includes("blocked")) {
        return NextResponse.json(
          {
            success: false,
            message: "Image could not be processed. Please try a different photo of your home's exterior.",
          },
          { status: 400 }
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
