import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Star } from "lucide-react";
import { company } from "@/data/company";
import { cities, getHighPriorityCities } from "@/data/cities";

const footerLinks = {
  services: [
    { name: "Lighting Design", href: "/services/design" },
    { name: "Installation", href: "/services/installation" },
    { name: "AI Visualizer", href: "/visualizer" },
    { name: "Gallery", href: "/gallery" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Reviews", href: "/reviews" },
    { name: "FAQ", href: "/faq" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  const highPriorityCities = getHighPriorityCities();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-primary">Fireflies</span>
              <span className="ml-1 block text-sm text-muted-foreground">
                Landscape Lighting
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Professional landscape lighting design and installation serving
              the Lake Norman area and York County. Over 10 years of experience
              transforming outdoor spaces.
            </p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(company.rating.value)
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {company.rating.value} ({company.rating.count} reviews)
              </span>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${company.phone}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {company.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {company.email}
                </a>
              </li>
              {company.addresses.map((address, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>
                    {address.street && `${address.street}, `}
                    {address.city}, {address.state} {address.zip}
                  </span>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={company.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Facebook className="h-5 w-5" />
                  Follow us on Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Service Areas */}
        <div className="mt-8 border-t border-border pt-8">
          <h3 className="mb-4 text-sm font-semibold text-foreground">
            Service Areas
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {city.name}, {city.stateAbbr}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Fireflies Landscape Lighting. All
            rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
