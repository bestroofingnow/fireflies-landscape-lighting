export interface City {
  name: string;
  state: string;
  stateAbbr: string;
  slug: string;
  priority: "high" | "medium" | "low";
  h1: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  county?: string;
  nearbyAreas: string[];
}

export const cities: City[] = [
  {
    name: "Charlotte",
    state: "North Carolina",
    stateAbbr: "NC",
    slug: "charlotte-nc",
    priority: "high",
    h1: "Landscape Lighting Contractor in Charlotte, NC",
    metaTitle: "Landscape Lighting Charlotte NC | Fireflies Lighting",
    metaDescription:
      "Professional landscape lighting design and installation in Charlotte, NC. Free estimates, lifetime warranty, and 10+ years experience. Call (803) 889-0096.",
    primaryKeyword: "landscape lighting Charlotte NC",
    county: "Mecklenburg County",
    nearbyAreas: ["Huntersville", "Cornelius", "Pineville", "Matthews"],
  },
  {
    name: "Mooresville",
    state: "North Carolina",
    stateAbbr: "NC",
    slug: "mooresville-nc",
    priority: "high",
    h1: "Landscape Lighting Contractor in Mooresville, NC",
    metaTitle: "Landscape Lighting Mooresville NC | Free Estimates",
    metaDescription:
      "Transform your Mooresville home with professional landscape lighting. Free estimates and lifetime warranty. Call Fireflies Landscape Lighting today!",
    primaryKeyword: "landscape lighting Mooresville NC",
    county: "Iredell County",
    nearbyAreas: ["Lake Norman", "Davidson", "Cornelius", "Huntersville"],
  },
  {
    name: "Cornelius",
    state: "North Carolina",
    stateAbbr: "NC",
    slug: "cornelius-nc",
    priority: "high",
    h1: "Landscape Lighting Contractor in Cornelius, NC",
    metaTitle: "Landscape Lighting Cornelius NC | Fireflies Lighting",
    metaDescription:
      "Expert landscape lighting services in Cornelius, NC. Custom designs, professional installation, and lifetime warranty. Get your free estimate!",
    primaryKeyword: "landscape lighting Cornelius NC",
    county: "Mecklenburg County",
    nearbyAreas: ["Lake Norman", "Davidson", "Huntersville", "Mooresville"],
  },
  {
    name: "Huntersville",
    state: "North Carolina",
    stateAbbr: "NC",
    slug: "huntersville-nc",
    priority: "high",
    h1: "Landscape Lighting Contractor in Huntersville, NC",
    metaTitle: "Landscape Lighting Huntersville NC | Expert Design",
    metaDescription:
      "Professional landscape lighting in Huntersville, NC. 10+ years experience, free nighttime demonstrations. Call (803) 889-0096 for your free estimate!",
    primaryKeyword: "landscape lighting Huntersville NC",
    county: "Mecklenburg County",
    nearbyAreas: ["Cornelius", "Charlotte", "Lake Norman", "Davidson"],
  },
  {
    name: "Lake Norman",
    state: "North Carolina",
    stateAbbr: "NC",
    slug: "lake-norman",
    priority: "high",
    h1: "Lake Norman Landscape Lighting Experts",
    metaTitle: "Lake Norman Landscape Lighting | 10+ Years Experience",
    metaDescription:
      "Premier landscape lighting for Lake Norman waterfront homes. Enhance your lake views with professional outdoor lighting. Free estimates available!",
    primaryKeyword: "Lake Norman landscape lighting",
    nearbyAreas: ["Mooresville", "Cornelius", "Davidson", "Huntersville"],
  },
  {
    name: "Pineville",
    state: "North Carolina",
    stateAbbr: "NC",
    slug: "pineville-nc",
    priority: "medium",
    h1: "Landscape Lighting Contractor in Pineville, NC",
    metaTitle: "Landscape Lighting Pineville NC | Free Estimates",
    metaDescription:
      "Quality landscape lighting services in Pineville, NC. Custom designs, professional installation, and lifetime warranty included!",
    primaryKeyword: "landscape lighting Pineville NC",
    county: "Mecklenburg County",
    nearbyAreas: ["Charlotte", "Fort Mill", "Matthews"],
  },
  {
    name: "Davidson",
    state: "North Carolina",
    stateAbbr: "NC",
    slug: "davidson-nc",
    priority: "medium",
    h1: "Landscape Lighting Contractor in Davidson, NC",
    metaTitle: "Landscape Lighting Davidson NC | Fireflies Lighting",
    metaDescription:
      "Enhance your Davidson home with professional landscape lighting. Expert design, quality installation, and lifetime warranty. Free estimates!",
    primaryKeyword: "landscape lighting Davidson NC",
    county: "Mecklenburg County",
    nearbyAreas: ["Lake Norman", "Cornelius", "Mooresville", "Huntersville"],
  },
  {
    name: "Lake Wylie",
    state: "South Carolina",
    stateAbbr: "SC",
    slug: "lake-wylie-sc",
    priority: "high",
    h1: "Landscape Lighting Contractor in Lake Wylie, SC",
    metaTitle: "Landscape Lighting Lake Wylie SC | Lifetime Warranty",
    metaDescription:
      "Professional landscape lighting for Lake Wylie homes. Waterfront specialists with 10+ years experience. Free estimates and lifetime warranty!",
    primaryKeyword: "landscape lighting Lake Wylie SC",
    county: "York County",
    nearbyAreas: ["Fort Mill", "Tega Cay", "Rock Hill", "Charlotte"],
  },
  {
    name: "Fort Mill",
    state: "South Carolina",
    stateAbbr: "SC",
    slug: "fort-mill-sc",
    priority: "high",
    h1: "Landscape Lighting Contractor in Fort Mill, SC",
    metaTitle: "Landscape Lighting Fort Mill SC | Free Estimates",
    metaDescription:
      "Transform your Fort Mill property with professional landscape lighting. Expert design, premium fixtures, and lifetime warranty included!",
    primaryKeyword: "landscape lighting Fort Mill SC",
    county: "York County",
    nearbyAreas: ["Lake Wylie", "Tega Cay", "Rock Hill", "Charlotte"],
  },
  {
    name: "Rock Hill",
    state: "South Carolina",
    stateAbbr: "SC",
    slug: "rock-hill-sc",
    priority: "high",
    h1: "Landscape Lighting Contractor in Rock Hill, SC",
    metaTitle: "Landscape Lighting Rock Hill SC | Expert Installation",
    metaDescription:
      "Rock Hill's trusted landscape lighting experts. Professional design, quality installation, and lifetime warranty. Call for your free estimate!",
    primaryKeyword: "landscape lighting Rock Hill SC",
    county: "York County",
    nearbyAreas: ["Fort Mill", "Lake Wylie", "Tega Cay", "Clover"],
  },
  {
    name: "Tega Cay",
    state: "South Carolina",
    stateAbbr: "SC",
    slug: "tega-cay-sc",
    priority: "medium",
    h1: "Landscape Lighting Contractor in Tega Cay, SC",
    metaTitle: "Landscape Lighting Tega Cay SC | Fireflies Lighting",
    metaDescription:
      "Enhance your Tega Cay home with professional outdoor lighting. Waterfront and residential specialists. Free estimates available!",
    primaryKeyword: "landscape lighting Tega Cay SC",
    county: "York County",
    nearbyAreas: ["Lake Wylie", "Fort Mill", "Rock Hill"],
  },
  {
    name: "Clover",
    state: "South Carolina",
    stateAbbr: "SC",
    slug: "clover-sc",
    priority: "low",
    h1: "Landscape Lighting Contractor in Clover, SC",
    metaTitle: "Landscape Lighting Clover SC | Free Estimates",
    metaDescription:
      "Professional landscape lighting services in Clover, SC. Quality designs, expert installation, and lifetime warranty. Call today!",
    primaryKeyword: "landscape lighting Clover SC",
    county: "York County",
    nearbyAreas: ["Rock Hill", "Lake Wylie", "Fort Mill"],
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}

export function getCitiesByState(stateAbbr: string): City[] {
  return cities.filter((city) => city.stateAbbr === stateAbbr);
}

export function getHighPriorityCities(): City[] {
  return cities.filter((city) => city.priority === "high");
}
