import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Lighting style prompts for image generation - each style is EXCLUSIVE
const lightingStylePrompts: Record<string, string> = {
  architectural: `Transform this home exterior to nighttime with ONLY architectural uplighting on the building structure.

STYLE FOCUS - ARCHITECTURAL UPLIGHTING ONLY:
- Add 3-5 brass/bronze LED uplights (2700K warm amber) positioned at the base of the home facade
- Angle lights upward at 15-30 degrees to wash the walls with warm light
- Highlight columns, stone/brick textures, window frames, and rooflines
- Create dramatic upward light beams on the building facade
- Add subtle warm glow halos around each fixture

CRITICAL - DO NOT ADD:
- NO pathway lights or walkway fixtures
- NO tree or garden lighting
- NO string lights or patio lights
- NO floodlights or security lights
- ONLY illuminate the building itself

The sky should be deep twilight blue. Add realistic shadows and light falloff. Keep the home structure exactly the same.`,

  pathway: `Transform this home exterior to nighttime with ONLY pathway and walkway lighting.

STYLE FOCUS - PATH LIGHTING ONLY:
- Add 6-10 low-voltage brass path lights along visible walkways, driveways, and garden borders
- Space fixtures 6-8 feet apart in a consistent pattern
- Each path light should cast a warm amber pool of light (2700K) on the ground
- Use mushroom-cap or hat-style path light fixtures
- Create overlapping pools of light along the walking path

CRITICAL - DO NOT ADD:
- NO uplighting on the house facade
- NO tree spotlights or garden accent lights
- NO string lights or patio lighting
- NO floodlights or security lighting
- ONLY illuminate walkways and paths

The sky should be deep twilight blue. The home should remain mostly in shadow except where path light spills naturally. Keep the home structure exactly the same.`,

  garden: `Transform this home exterior to nighttime with ONLY garden and landscape accent lighting.

STYLE FOCUS - GARDEN/TREE LIGHTING ONLY:
- Add dramatic uplights at the base of trees to silhouette branches against the night sky
- Position 2-3 spotlights to highlight specimen plants, shrubs, or garden features
- Use warm amber LEDs (2700K-3000K) with visible light beams through foliage
- Create moonlighting effects through tree canopies where applicable
- Add subtle ground-level accent lights near flower beds or landscape features

CRITICAL - DO NOT ADD:
- NO uplighting on the house facade or walls
- NO pathway lights along walkways
- NO string lights or patio fixtures
- NO floodlights or security lighting
- ONLY illuminate trees, plants, and landscaping

The sky should be deep twilight blue. The home should remain in shadow - focus lighting on landscape elements only. Keep the home structure exactly the same.`,

  outdoor_living: `Transform this home exterior to nighttime with ONLY outdoor living space ambient lighting.

STYLE FOCUS - PATIO/DECK AMBIENT LIGHTING ONLY:
- Add warm string lights or bistro lights over patio/deck areas if visible
- Include subtle recessed soffit lights under eaves or overhangs
- Add wall-mounted sconces near doors or seating areas
- Create a cozy, intimate ambiance with warm white light (2700K)
- Focus on entertaining spaces - patios, decks, porches, pergolas

CRITICAL - DO NOT ADD:
- NO dramatic uplighting on the house facade
- NO pathway lights along walkways
- NO tree spotlights or garden accent lights
- NO bright floodlights or security lighting
- ONLY illuminate outdoor living/entertaining spaces

The sky should be deep twilight blue. Create an inviting atmosphere for the living spaces. Keep the home structure exactly the same.`,

  security: `Transform this home exterior to nighttime with ONLY security and safety lighting.

STYLE FOCUS - SECURITY LIGHTING ONLY:
- Add 2-3 motion-sensor style LED floodlights at entry points (garage, front door, side gates)
- Include eave-mounted downlights for perimeter visibility
- Use brighter, whiter light (3000-4000K) typical of security fixtures
- Ensure even coverage at vulnerable entry points
- Add subtle dusk-to-dawn fixtures near doors

CRITICAL - DO NOT ADD:
- NO decorative uplighting on the facade
- NO pathway lights or walkway fixtures
- NO garden accent lights or tree spotlights
- NO string lights or ambient patio lighting
- ONLY functional security/safety illumination

The sky should be deep twilight blue. Focus on practical visibility and entry point illumination. Keep the home structure exactly the same.`,

  combination: `Transform this home exterior to nighttime with a COMPLETE professional landscape lighting design.

INCLUDE ALL FIVE LIGHTING TYPES:
1. ARCHITECTURAL: Warm amber uplights (2700K) washing the home facade, highlighting columns and textures
2. PATHWAY: Brass path lights every 6-8 feet along all visible walkways and driveways
3. GARDEN: Dramatic tree uplights and accent spots on landscape features
4. OUTDOOR LIVING: String lights or ambient fixtures over patios/decks, wall sconces near doors
5. SECURITY: Subtle eave-mounted downlights at entry points for safety

Create a cohesive, layered lighting design that balances all elements. Use warm color temperatures (2700K-3000K) for decorative elements. Add realistic glows, light beams, and natural shadow interplay.

The sky should be deep twilight blue. This should look like a premium, professionally-designed lighting installation. Keep the home structure exactly the same.`,
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
