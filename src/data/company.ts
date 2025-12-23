export const company = {
  name: "Fireflies Landscape Lighting",
  phone: "+1 803-889-0096",
  phoneDisplay: "(803) 889-0096",
  email: "john@fireflieslandscapelighting.com",
  addresses: [
    {
      street: "",
      city: "Mooresville",
      state: "NC",
      zip: "28115",
      type: "primary" as const,
    },
    {
      street: "168 Hwy 274 Unit 1436",
      city: "Lake Wylie",
      state: "SC",
      zip: "29710",
      type: "secondary" as const,
    },
  ],
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100083281122004",
  },
  rating: {
    value: 4.7,
    count: 15,
    source: "Google",
  },
  valueProps: [
    {
      title: "10+ Years Experience",
      description: "Over a decade of professional landscape lighting expertise",
      icon: "Award",
    },
    {
      title: "Lifetime Warranty",
      description: "We stand behind our work with a comprehensive lifetime warranty",
      icon: "Shield",
    },
    {
      title: "Free Estimates",
      description: "No-obligation consultations to discuss your lighting vision",
      icon: "FileText",
    },
    {
      title: "Free Nighttime Demos",
      description: "See exactly how your lighting will look before installation",
      icon: "Moon",
    },
  ],
  services: [
    {
      title: "Landscape Lighting Design",
      slug: "design",
      description:
        "Custom lighting designs that enhance your home's architecture and landscape features.",
      features: [
        "Professional site assessment",
        "Custom lighting layout",
        "3D visualization",
        "Energy-efficient LED options",
      ],
    },
    {
      title: "Professional Installation",
      slug: "installation",
      description:
        "Expert installation by trained technicians with attention to every detail.",
      features: [
        "Clean, hidden wiring",
        "Premium fixtures",
        "Smart control systems",
        "Post-installation support",
      ],
    },
  ],
  hours: {
    weekdays: "8:00 AM - 8:00 PM",
    saturday: "8:00 AM - 8:00 PM",
    sunday: "Closed",
  },
} as const;

export type Company = typeof company;
