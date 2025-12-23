import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/sections";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips, trends, and inspiration for landscape lighting. Learn about outdoor lighting design, maintenance, and how to enhance your home's curb appeal.",
};

// Placeholder blog posts - in production these would come from WordPress via GraphQL
const blogPosts = [
  {
    slug: "5-reasons-to-invest-in-landscape-lighting",
    title: "5 Reasons to Invest in Landscape Lighting",
    excerpt:
      "Discover why landscape lighting is one of the best investments you can make for your home, from curb appeal to security.",
    category: "Tips & Advice",
    date: "November 15, 2024",
    readTime: "5 min read",
  },
  {
    slug: "choosing-the-right-color-temperature",
    title: "Choosing the Right Color Temperature for Your Outdoor Lighting",
    excerpt:
      "Learn the difference between warm and cool lighting, and how to choose the perfect color temperature for your landscape.",
    category: "Design",
    date: "October 28, 2024",
    readTime: "4 min read",
  },
  {
    slug: "landscape-lighting-for-lake-norman-homes",
    title: "Landscape Lighting Tips for Lake Norman Waterfront Homes",
    excerpt:
      "Special considerations and design ideas for lighting lakefront properties in the Lake Norman area.",
    category: "Local",
    date: "October 10, 2024",
    readTime: "6 min read",
  },
  {
    slug: "led-vs-halogen-landscape-lighting",
    title: "LED vs Halogen: Which is Right for Your Landscape?",
    excerpt:
      "A comprehensive comparison of LED and halogen lighting to help you make the best choice for your outdoor space.",
    category: "Technology",
    date: "September 22, 2024",
    readTime: "7 min read",
  },
  {
    slug: "maintaining-your-landscape-lighting",
    title: "How to Maintain Your Landscape Lighting System",
    excerpt:
      "Simple maintenance tips to keep your outdoor lighting looking beautiful and functioning properly for years to come.",
    category: "Maintenance",
    date: "September 5, 2024",
    readTime: "4 min read",
  },
  {
    slug: "holiday-lighting-ideas",
    title: "Creative Holiday Lighting Ideas for Your Home",
    excerpt:
      "Inspiration for festive lighting displays that will make your home the star of the neighborhood this holiday season.",
    category: "Seasonal",
    date: "August 18, 2024",
    readTime: "5 min read",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-card py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              Lighting <span className="text-primary">Insights</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Tips, trends, and inspiration for landscape lighting. Learn how to
              enhance your home&apos;s beauty and security with professional
              outdoor lighting.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-2xl bg-background border border-border overflow-hidden transition-shadow hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Image placeholder */}
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                        <Tag className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {post.category}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Read more */}
                  <span className="inline-flex items-center text-primary font-medium">
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              More Content Coming Soon
            </h2>
            <p className="text-muted-foreground mb-8">
              We&apos;re working on bringing you more helpful articles about
              landscape lighting. In the meantime, explore our AI visualizer or
              get a free estimate!
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild className="glow-firefly-sm">
                <Link href="/visualizer">
                  Try the AI Visualizer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/get-estimate">Request Free Estimate</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
