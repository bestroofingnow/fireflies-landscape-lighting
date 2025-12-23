import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/sections";
import {
  getPostBySlug,
  getAllPostSlugs,
  formatDate,
  estimateReadTime,
} from "@/lib/wordpress";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Only generate static params if WordPress is configured
  if (!process.env.WORDPRESS_API_URL) {
    return [];
  }

  try {
    const slugs = await getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!process.env.WORDPRESS_API_URL) {
    return {
      title: "Blog Post",
      description: "Read our latest insights on landscape lighting.",
    };
  }

  try {
    const post = await getPostBySlug(slug);

    if (!post) {
      return {
        title: "Post Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    return {
      title: post.title,
      description: post.excerpt.replace(/<[^>]*>/g, "").slice(0, 160),
      openGraph: {
        title: post.title,
        description: post.excerpt.replace(/<[^>]*>/g, "").slice(0, 160),
        type: "article",
        publishedTime: post.date,
        images: post.featuredImage?.node?.sourceUrl
          ? [{ url: post.featuredImage.node.sourceUrl }]
          : [],
      },
    };
  } catch {
    return {
      title: "Blog Post",
      description: "Read our latest insights on landscape lighting.",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  // Check if WordPress is configured
  if (!process.env.WORDPRESS_API_URL) {
    return (
      <>
        <section className="py-20 bg-gradient-to-b from-background to-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-foreground mb-6">
                Blog Coming Soon
              </h1>
              <p className="text-muted-foreground mb-8">
                We&apos;re working on bringing you helpful content about landscape
                lighting. Check back soon!
              </p>
              <Button asChild>
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
            </div>
          </div>
        </section>
        <CTA />
      </>
    );
  }

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Article Header */}
      <article className="py-12 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center text-muted-foreground hover:text-primary mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>

            {/* Category */}
            {post.categories.nodes[0] && (
              <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
                {post.categories.nodes[0].name}
              </span>
            )}

            {/* Title */}
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {estimateReadTime(post.content)}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author.node.name}
              </span>
            </div>

            {/* Featured Image */}
            {post.featuredImage?.node && (
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-12">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Article Content */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-lg prose-invert max-w-none
                prose-headings:text-foreground
                prose-p:text-muted-foreground
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-ul:text-muted-foreground
                prose-ol:text-muted-foreground
                prose-li:text-muted-foreground
                prose-blockquote:text-muted-foreground prose-blockquote:border-primary
                prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share / CTA */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Ready to light up your home?
                  </h3>
                  <p className="text-muted-foreground">
                    Get a free estimate for professional landscape lighting.
                  </p>
                </div>
                <Button asChild className="glow-firefly-sm">
                  <Link href="/get-estimate">Get Free Estimate</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
