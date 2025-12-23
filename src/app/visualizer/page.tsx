import { Metadata } from "next";
import { VisualizerTool } from "@/components/visualizer/VisualizerTool";
import { CTA } from "@/components/sections";

export const metadata: Metadata = {
  title: "AI Lighting Visualizer",
  description:
    "Upload a photo of your home and see how professional landscape lighting will transform your property. Free AI-powered visualization tool from Fireflies Landscape Lighting.",
};

export default function VisualizerPage() {
  return (
    <>
      <VisualizerTool />
      <CTA
        title="Love What You See?"
        subtitle="Get a free professional estimate and see how we can bring this vision to life."
        showPhone={true}
      />
    </>
  );
}
