"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { company } from "@/data/company";
import { cities } from "@/data/cities";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Services",
    href: "/services",
    children: [
      { name: "Lighting Design", href: "/services/design" },
      { name: "Installation", href: "/services/installation" },
    ],
  },
  {
    name: "Service Areas",
    href: "/service-areas",
    children: cities.map((city) => ({
      name: `${city.name}, ${city.stateAbbr}`,
      href: `/service-areas/${city.slug}`,
    })),
  },
  { name: "Visualizer", href: "/visualizer" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary">Fireflies</span>
            <span className="ml-1 text-sm text-muted-foreground">
              Landscape Lighting
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-6">
          {navigation.map((item) =>
            item.children ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                  {item.name}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="max-h-[400px] overflow-y-auto"
                >
                  <DropdownMenuItem asChild>
                    <Link href={item.href} className="font-medium">
                      All {item.name}
                    </Link>
                  </DropdownMenuItem>
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.href} asChild>
                      <Link href={child.href}>{child.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* CTA Buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${company.phone}`}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <Phone className="h-4 w-4" />
            {company.phoneDisplay}
          </a>
          <Button asChild className="glow-firefly-sm">
            <Link href="/get-estimate">Get Free Estimate</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-2 text-lg font-medium text-foreground hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-2 flex flex-col gap-2">
                      {item.children.slice(0, 6).map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="text-sm text-muted-foreground hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                      {item.children.length > 6 && (
                        <Link
                          href={item.href}
                          className="text-sm font-medium text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          View all...
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-6 border-t border-border pt-6">
                <a
                  href={`tel:${company.phone}`}
                  className="flex items-center gap-2 text-lg font-medium text-primary"
                >
                  <Phone className="h-5 w-5" />
                  {company.phoneDisplay}
                </a>
                <Button asChild className="mt-4 w-full glow-firefly-sm">
                  <Link
                    href="/get-estimate"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Free Estimate
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
