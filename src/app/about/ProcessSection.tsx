"use client";

import { ProcessTimeline } from "@/components/animations";

export function ProcessSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground">
            How We <span className="text-primary">Work</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            From your first call to the final installation, we make the process simple and enjoyable
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <ProcessTimeline />
        </div>
      </div>
    </section>
  );
}
