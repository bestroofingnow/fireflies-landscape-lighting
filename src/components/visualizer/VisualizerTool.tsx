"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Sparkles,
  RefreshCw,
  Loader2,
  X,
  Check,
  ArrowRight,
  AlertCircle,
  Lightbulb,
  Copy,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type LightingStyle = {
  id: string;
  name: string;
  description: string;
};

const lightingStyles: LightingStyle[] = [
  {
    id: "architectural",
    name: "Architectural Uplighting",
    description: "Highlight your home's facade and architectural features",
  },
  {
    id: "pathway",
    name: "Path & Walkway",
    description: "Illuminate walkways and driveways with elegant path lights",
  },
  {
    id: "garden",
    name: "Garden & Plants",
    description: "Accent trees, shrubs, and landscaping features",
  },
  {
    id: "outdoor_living",
    name: "Outdoor Living",
    description: "Create ambiance for patios and entertaining areas",
  },
  {
    id: "security",
    name: "Security Lighting",
    description: "Well-lit entry points and perimeter lighting",
  },
  {
    id: "combination",
    name: "Full Package",
    description: "Complete lighting design with all elements",
  },
];

export function VisualizerTool() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedMimeType, setUploadedMimeType] = useState<string>("image/jpeg");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [textDescription, setTextDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    []
  );

  const handleFile = (file: File) => {
    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a JPEG, PNG, or WebP image.");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be less than 10MB.");
      return;
    }

    setError(null);
    setUploadedMimeType(file.type);

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = (e.target?.result as string).split(",")[1];
      setUploadedImage(base64);
      setTextDescription(null);
    };
    reader.readAsDataURL(file);
  };

  const handleVisualize = async () => {
    if (!uploadedImage || !selectedStyle) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/visualize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: uploadedImage,
          style: selectedStyle,
          mimeType: uploadedMimeType,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to generate visualization");
      }

      setTextDescription(data.textDescription);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyDescription = async () => {
    if (!textDescription) return;

    try {
      await navigator.clipboard.writeText(textDescription);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    setSelectedStyle(null);
    setTextDescription(null);
    setError(null);
    setCopied(false);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-6">
            <Sparkles className="h-4 w-4" />
            AI-Powered Visualization
          </div>
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
            Visualize Your <span className="text-primary">Landscape Lighting</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload a photo of your home and see how professional landscape
            lighting will transform your property.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Main content area */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left: Upload & Controls */}
            <div className="space-y-6">
              {/* Upload Area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  1. Upload Your Photo
                </h2>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative rounded-2xl border-2 border-dashed transition-all ${
                    isDragging
                      ? "border-primary bg-primary/5"
                      : uploadedImage
                        ? "border-primary/50 bg-card"
                        : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  {uploadedImage ? (
                    <div className="relative aspect-[4/3]">
                      <img
                        src={`data:${uploadedMimeType};base64,${uploadedImage}`}
                        alt="Uploaded home"
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <button
                        onClick={handleReset}
                        className="absolute top-3 right-3 p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center aspect-[4/3] cursor-pointer p-8">
                      <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-foreground font-medium mb-2">
                        Drop your photo here or click to upload
                      </p>
                      <p className="text-sm text-muted-foreground text-center">
                        JPEG, PNG, or WebP (max 10MB)
                        <br />
                        Best results with exterior home photos
                      </p>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </motion.div>

              {/* Style Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  2. Choose Lighting Style
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {lightingStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      disabled={!uploadedImage}
                      className={`relative p-4 rounded-xl border text-left transition-all ${
                        selectedStyle === style.id
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card hover:border-primary/50"
                      } ${!uploadedImage ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {selectedStyle === style.id && (
                        <div className="absolute top-3 right-3">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <h3 className="font-medium text-foreground mb-1">
                        {style.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {style.description}
                      </p>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Generate Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  size="lg"
                  onClick={handleVisualize}
                  disabled={!uploadedImage || !selectedStyle || isLoading}
                  className="w-full glow-firefly-sm"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating Visualization...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Visualize My Lighting
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20"
                  >
                    <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <p className="text-sm text-destructive">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Result */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-semibold text-foreground">
                3. See Your Results
              </h2>
              <div className="relative min-h-[300px] rounded-2xl bg-card border border-border overflow-hidden">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4"
                      >
                        <Sparkles className="h-8 w-8 text-primary" />
                      </motion.div>
                      <p className="text-muted-foreground">
                        Analyzing your home...
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Creating personalized lighting recommendations
                      </p>
                    </motion.div>
                  ) : textDescription ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Lightbulb className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            Your Lighting Vision
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            AI-generated design recommendation
                          </p>
                        </div>
                      </div>
                      <div className="prose prose-sm prose-invert max-w-none">
                        <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                          {textDescription}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-8"
                    >
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Sparkles className="h-8 w-8 text-primary/50" />
                      </div>
                      <p className="text-muted-foreground text-center">
                        Your personalized lighting design will appear here
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Result Actions */}
              {textDescription && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-4 sm:flex-row"
                >
                  <Button
                    variant="outline"
                    onClick={handleCopyDescription}
                    className="flex-1"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Description
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setTextDescription(null);
                      setSelectedStyle(null);
                    }}
                    className="flex-1"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Another Style
                  </Button>
                </motion.div>
              )}

              {/* CTA Card */}
              {textDescription && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-2xl bg-primary/10 border border-primary/20 p-6"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Love this vision for your home?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Get a free professional consultation and let our experts
                    bring this lighting design to life with expert installation.
                  </p>
                  <Button asChild className="w-full glow-firefly-sm">
                    <Link href="/get-estimate">
                      Get Your Free Estimate
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 rounded-2xl bg-card border border-border p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Tips for Best Results
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  tip: "Use exterior photos",
                  desc: "Front or back of your home works best",
                },
                {
                  tip: "Good lighting",
                  desc: "Daytime or dusk photos show more detail",
                },
                {
                  tip: "Clear view",
                  desc: "Capture the full facade without obstructions",
                },
                {
                  tip: "High quality",
                  desc: "Higher resolution photos yield better results",
                },
              ].map((item) => (
                <div key={item.tip} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">{item.tip}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
