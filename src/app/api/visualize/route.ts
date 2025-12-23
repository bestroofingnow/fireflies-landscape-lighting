import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// For App Router - increase max duration for AI processing (Vercel serverless)
export const maxDuration = 60;

// Note: For body size limits in App Router, use next.config.js
// The default is usually enough for base64 images under 10MB

// Base instruction that applies to ALL lighting styles - preserves original image
const BASE_PRESERVATION_INSTRUCTION = `CRITICAL IMAGE PRESERVATION RULES - READ FIRST:
- DO NOT add, remove, or modify ANY physical elements in the image
- DO NOT add new trees, bushes, plants, paths, walkways, fences, or landscaping
- DO NOT change the house structure, windows, doors, roof, or architecture
- DO NOT add or remove any objects, furniture, vehicles, or decorations
- ONLY change the TIME OF DAY to evening/night (deep twilight blue sky)
- ONLY add LIGHTING FIXTURES and their LIGHT EFFECTS to existing elements
- The image must look like the EXACT SAME property, just at night with lights added

`;

// Lighting style prompts for image generation - each style is EXCLUSIVE
const lightingStylePrompts: Record<string, string> = {
  architectural: BASE_PRESERVATION_INSTRUCTION + `Transform this home exterior to nighttime with ONLY architectural uplighting on the building structure.

STYLE FOCUS - ARCHITECTURAL UPLIGHTING ONLY:
- Add 3-5 brass/bronze LED uplights (2700K warm amber) positioned at the base of the home facade
- Angle lights upward at 15-30 degrees to wash the walls with warm light
- Highlight existing columns, stone/brick textures, window frames, and rooflines
- Create dramatic upward light beams on the building facade
- Add subtle warm glow halos around each fixture

LIGHTING RESTRICTIONS:
- NO pathway lights or walkway fixtures
- NO tree or garden lighting
- NO string lights or patio lights
- NO floodlights or security lights
- ONLY add uplighting on the existing building

The sky must be deep twilight blue (evening/dusk). Add realistic shadows and light falloff from the fixtures.`,

  pathway: BASE_PRESERVATION_INSTRUCTION + `Transform this home exterior to nighttime with ONLY pathway and walkway lighting.

STYLE FOCUS - PATH LIGHTING ONLY:
- Add 6-10 low-voltage brass path lights ONLY along EXISTING visible walkways, driveways, and garden borders
- Space fixtures 6-8 feet apart following the existing path layout
- Each path light should cast a warm amber pool of light (2700K) on the ground
- Use mushroom-cap or hat-style path light fixtures
- Create overlapping pools of light along the existing walking paths

LIGHTING RESTRICTIONS:
- NO uplighting on the house facade
- NO tree spotlights or garden accent lights
- NO string lights or patio lighting
- NO floodlights or security lighting
- ONLY add path lights to EXISTING walkways - do not create new paths

The sky must be deep twilight blue (evening/dusk). The home should remain mostly in shadow except where path light spills naturally.`,

  garden: BASE_PRESERVATION_INSTRUCTION + `Transform this home exterior to nighttime with ONLY garden and landscape accent lighting.

STYLE FOCUS - GARDEN/TREE LIGHTING ONLY:
- Add dramatic uplights at the base of EXISTING trees to silhouette their branches against the night sky
- Position 2-3 spotlights to highlight EXISTING plants, shrubs, or garden features that are visible in the photo
- Use warm amber LEDs (2700K-3000K) with visible light beams through existing foliage
- Create moonlighting effects through existing tree canopies where applicable
- Add subtle ground-level accent lights near existing flower beds or landscape features

LIGHTING RESTRICTIONS:
- NO uplighting on the house facade or walls
- NO pathway lights along walkways
- NO string lights or patio fixtures
- NO floodlights or security lighting
- ONLY illuminate EXISTING trees, plants, and landscaping - do not add new plants

The sky must be deep twilight blue (evening/dusk). The home should remain in shadow - focus lighting on existing landscape elements only.`,

  outdoor_living: BASE_PRESERVATION_INSTRUCTION + `Transform this home exterior to nighttime with ONLY outdoor living space ambient lighting.

STYLE FOCUS - PATIO/DECK AMBIENT LIGHTING ONLY:
- Add warm string lights or bistro lights over EXISTING patio/deck areas if visible in the photo
- Include subtle recessed soffit lights under existing eaves or overhangs
- Add wall-mounted sconces near existing doors or seating areas
- Create a cozy, intimate ambiance with warm white light (2700K)
- Focus on EXISTING entertaining spaces - patios, decks, porches, pergolas that are in the photo

LIGHTING RESTRICTIONS:
- NO dramatic uplighting on the house facade
- NO pathway lights along walkways
- NO tree spotlights or garden accent lights
- NO bright floodlights or security lighting
- ONLY illuminate EXISTING outdoor living spaces - do not add new structures

The sky must be deep twilight blue (evening/dusk). Create an inviting atmosphere for existing living spaces.`,

  security: BASE_PRESERVATION_INSTRUCTION + `Transform this home exterior to nighttime with ONLY security and safety lighting.

STYLE FOCUS - SECURITY LIGHTING ONLY:
- Add 2-3 motion-sensor style LED floodlights at EXISTING entry points (garage, front door, side gates)
- Include eave-mounted downlights on existing eaves for perimeter visibility
- Use brighter, whiter light (3000-4000K) typical of security fixtures
- Ensure even coverage at existing vulnerable entry points
- Add subtle dusk-to-dawn fixtures near existing doors

LIGHTING RESTRICTIONS:
- NO decorative uplighting on the facade
- NO pathway lights or walkway fixtures
- NO garden accent lights or tree spotlights
- NO string lights or ambient patio lighting
- ONLY add functional security lighting to EXISTING structures

The sky must be deep twilight blue (evening/dusk). Focus on practical visibility and existing entry point illumination.`,

  combination: BASE_PRESERVATION_INSTRUCTION + `Transform this home exterior to nighttime with a COMPLETE professional landscape lighting design.

INCLUDE ALL FIVE LIGHTING TYPES ON EXISTING ELEMENTS:
1. ARCHITECTURAL: Warm amber uplights (2700K) washing the existing home facade, highlighting existing columns and textures
2. PATHWAY: Brass path lights every 6-8 feet along all EXISTING visible walkways and driveways
3. GARDEN: Dramatic uplights on EXISTING trees and accent spots on existing landscape features
4. OUTDOOR LIVING: String lights or ambient fixtures over EXISTING patios/decks, wall sconces near existing doors
5. SECURITY: Subtle eave-mounted downlights at existing entry points for safety

Create a cohesive, layered lighting design on the EXISTING property elements. Use warm color temperatures (2700K-3000K) for decorative elements. Add realistic glows, light beams, and natural shadow interplay.

The sky must be deep twilight blue (evening/dusk). This should look like the EXACT SAME property with premium, professionally-designed lighting installed.`,
};

// Primary: Gemini 3 Pro Image (Nano Banana Pro)
async function generateWithNanaBananaPro(
  genAI: GoogleGenerativeAI,
  prompt: string,
  imageData: string,
  mimeType: string
): Promise<{ image: string | null; text: string | null }> {
  const model = genAI.getGenerativeModel({
    model: "gemini-3-pro-image-preview",
    generationConfig: {
      // @ts-expect-error - imageConfig is supported but not in types yet
      imageConfig: {
        aspectRatio: "4:3",
        imageSize: "2K",
      },
    },
  });

  const imagePart = {
    inlineData: {
      data: imageData,
      mimeType: mimeType || "image/jpeg",
    },
  };

  const result = await model.generateContent([prompt, imagePart]);
  const response = result.response;

  let generatedImage: string | null = null;
  let textDescription: string | null = null;

  if (response.candidates && response.candidates[0]) {
    const parts = response.candidates[0].content?.parts || [];

    for (const part of parts) {
      if ("inlineData" in part && part.inlineData) {
        generatedImage = part.inlineData.data;
      }
      if ("text" in part && part.text) {
        textDescription = part.text;
      }
    }
  }

  return { image: generatedImage, text: textDescription };
}

// Fallback 1: Gemini 2.5 Flash (Nana Banana) with image generation
async function generateWithNanaBanana(
  genAI: GoogleGenerativeAI,
  prompt: string,
  imageData: string,
  mimeType: string
): Promise<{ image: string | null; text: string | null }> {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-preview-05-20",
    generationConfig: {
      // @ts-expect-error - responseModalities is supported but not in types yet
      responseModalities: ["Text", "Image"],
    },
  });

  const imagePart = {
    inlineData: {
      data: imageData,
      mimeType: mimeType || "image/jpeg",
    },
  };

  const result = await model.generateContent([prompt, imagePart]);
  const response = result.response;

  let generatedImage: string | null = null;
  let textDescription: string | null = null;

  if (response.candidates && response.candidates[0]) {
    const parts = response.candidates[0].content?.parts || [];

    for (const part of parts) {
      if ("inlineData" in part && part.inlineData) {
        generatedImage = part.inlineData.data;
      }
      if ("text" in part && part.text) {
        textDescription = part.text;
      }
    }
  }

  return { image: generatedImage, text: textDescription };
}

// Fallback 2: Text description only with Gemini 2.5 Flash
async function generateTextDescription(
  genAI: GoogleGenerativeAI,
  prompt: string,
  imageData: string,
  mimeType: string
): Promise<{ image: string | null; text: string | null }> {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-preview-05-20",
  });

  const imagePart = {
    inlineData: {
      data: imageData,
      mimeType: mimeType || "image/jpeg",
    },
  };

  const textPrompt = `You are a professional landscape lighting visualization expert.

Analyze this home exterior image and create a detailed description of how the following lighting design would transform it:

${prompt}

Provide a vivid, detailed description of:
1. Where each light fixture would be placed
2. How the light would fall on the architecture and landscaping
3. The overall ambiance and mood created
4. Specific features that would be highlighted

Make the description so vivid that the homeowner can visualize exactly how their home would look with professional landscape lighting installed.`;

  const result = await model.generateContent([textPrompt, imagePart]);
  const response = result.response;

  let textDescription: string | null = null;

  if (response.candidates && response.candidates[0]) {
    const parts = response.candidates[0].content?.parts || [];
    for (const part of parts) {
      if ("text" in part && part.text) {
        textDescription = part.text;
      }
    }
  }

  return { image: null, text: textDescription };
}

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
    const genAI = new GoogleGenerativeAI(apiKey);

    // Step 1: Try Nano Banana Pro (Gemini 3 Pro Image)
    try {
      console.log("Step 1: Attempting Gemini 3 Pro Image (Nano Banana Pro)...");
      const result = await generateWithNanaBananaPro(genAI, prompt, image, mimeType);

      if (result.image) {
        console.log("Successfully generated image with Nano Banana Pro");
        return NextResponse.json({
          success: true,
          resultImage: result.image,
          textDescription: result.text,
          message: "Your home with professional landscape lighting:",
          model: "gemini-3-pro-image-preview",
        });
      }
      console.log("Nano Banana Pro did not return an image");
    } catch (nanaBananaProError) {
      console.log(
        "Nano Banana Pro failed:",
        nanaBananaProError instanceof Error ? nanaBananaProError.message : "Unknown error"
      );
    }

    // Step 2: Fallback to Gemini 2.5 Flash (Nana Banana) for image generation
    try {
      console.log("Step 2: Attempting Gemini 2.5 Flash (Nana Banana) for image...");
      const result = await generateWithNanaBanana(genAI, prompt, image, mimeType);

      if (result.image) {
        console.log("Successfully generated image with Nana Banana (2.5 Flash)");
        return NextResponse.json({
          success: true,
          resultImage: result.image,
          textDescription: result.text,
          message: "Your home with professional landscape lighting:",
          model: "gemini-2.5-flash-preview-05-20",
        });
      }
      console.log("Nana Banana (2.5 Flash) did not return an image");
    } catch (nanaBananaError) {
      console.log(
        "Nana Banana (2.5 Flash) image gen failed:",
        nanaBananaError instanceof Error ? nanaBananaError.message : "Unknown error"
      );
    }

    // Step 3: Final fallback - Text description only with Gemini 2.5 Flash
    try {
      console.log("Step 3: Falling back to text description with Gemini 2.5 Flash...");
      const result = await generateTextDescription(genAI, prompt, image, mimeType);

      if (result.text) {
        return NextResponse.json({
          success: true,
          resultImage: null,
          textDescription: result.text,
          message:
            "Here's how your home would look with professional landscape lighting:",
          model: "gemini-2.5-flash-preview-05-20 (text)",
        });
      }
    } catch (textError) {
      console.error("Text description also failed:", textError);
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

      if (
        errorMessage.includes("quota") ||
        errorMessage.includes("rate limit")
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "API quota exceeded. Please try again later or contact us for a free in-person demonstration.",
          },
          { status: 429 }
        );
      }

      if (
        errorMessage.includes("api key") ||
        errorMessage.includes("api_key") ||
        errorMessage.includes("invalid key") ||
        errorMessage.includes("unauthorized")
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "API configuration error. Please ensure a valid Google AI API key is configured.",
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
            message:
              "Image could not be processed. Please try a different photo of your home's exterior.",
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
