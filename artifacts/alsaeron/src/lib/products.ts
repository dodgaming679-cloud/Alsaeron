export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: string;
  priceNote: string;
  tagline: string;
  description: string;
  story: string[];
  specs: { label: string; value: string }[];
  accentColor: string;
  glowColor: string;
  glowRgb: string;
  shape: "circle" | "diamond" | "hexagon";
  cardImage: string;
  heroImage: string;
}

export const products: Product[] = [
  {
    id: 1,
    slug: "sovereign-timepiece",
    name: "The Sovereign Timepiece",
    category: "Chronometry",
    price: "$145,000",
    priceNote: "Price upon private consultation",
    tagline: "Time does not pass. It obeys.",
    description:
      "Forged in dark matter composite. A chronometer that measures epochs, not hours.",
    story: [
      "In the vaults of the first Alsaeron atelier, a single question was posed: what if a timepiece could outlast its civilization? The answer is the Sovereign — a chronometer built not for the wrist, but for history itself.",
      "Its movement comprises 847 hand-finished components, each machined to tolerances measured in atoms. The case is wrought from a proprietary dark matter composite — a material so dense it bends ambient light, creating a subtle visual distortion that shifts with every angle.",
      "The dial is a cartography of deep time. Its indices mark not seconds, but epochs — geological, cosmic, and imperial. Every Sovereign is individually calibrated to its owner's longitude of birth, a ritual begun at first light on the day of commission.",
      "There are no replicas. There is no waiting list. There is only an invitation — extended once, to one person, in a lifetime.",
    ],
    specs: [
      { label: "Movement", value: "ALSAERON Calibre I — 847 components" },
      { label: "Case Material", value: "Dark Matter Composite + Grade V Titanium" },
      { label: "Power Reserve", value: "400 hours" },
      { label: "Water Resistance", value: "Irrelevant — built for eternity" },
      { label: "Diameter", value: "42.5mm × 11.2mm" },
      { label: "Edition", value: "Singular — one per epoch" },
    ],
    accentColor: "rgba(37, 99, 235, 0.18)",
    glowColor: "rgba(37, 99, 235, 0.4)",
    glowRgb: "37, 99, 235",
    shape: "circle",
    cardImage:
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&auto=format&fit=crop&q=90",
    heroImage:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1800&auto=format&fit=crop&q=85",
  },
  {
    id: 2,
    slug: "dynasty-ring",
    name: "Dynasty Ring",
    category: "Adornment",
    price: "$28,500",
    priceNote: "Includes private sizing ceremony",
    tagline: "The mark of an emperor. The weight of a dynasty.",
    description: "Platinum and zero-point energy crystal. The mark of an emperor.",
    story: [
      "The Dynasty Ring was conceived after a single obsession: what does power feel like on the hand? Not the performance of power — the actual, physical sensation of being the kind of person who commands silence when they enter a room.",
      "The band is hand-formed from a single ingot of 950 platinum, worked at temperatures that would destroy lesser alloys. At its crown sits a zero-point energy crystal — a synthetic stone grown over 180 days in conditions mimicking the pressure at the center of a dying star.",
      "The crystal does not sparkle. It absorbs. Light enters its lattice and is held there, giving the stone an inner luminescence that seems to come from within rather than reflect from without. In low light, it is the only thing in the room that glows.",
      "Each ring is fitted during a private ceremony at an ALSAERON atelier, where dimensions are recorded to a fraction of a millimetre and archived forever — should a second commission ever be considered.",
    ],
    specs: [
      { label: "Band Material", value: "950 Platinum — single ingot form" },
      { label: "Stone", value: "Zero-Point Energy Crystal, 4.8ct" },
      { label: "Stone Cultivation", value: "180 days under stellar pressure simulation" },
      { label: "Finish", value: "Brushed + micro-polished contrast" },
      { label: "Sizing", value: "Private ceremony — archived permanently" },
      { label: "Edition", value: "12 per year, across all sizes" },
    ],
    accentColor: "rgba(99, 102, 241, 0.18)",
    glowColor: "rgba(99, 102, 241, 0.4)",
    glowRgb: "99, 102, 241",
    shape: "diamond",
    cardImage:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=90",
    heroImage:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1800&auto=format&fit=crop&q=85",
  },
  {
    id: 3,
    slug: "celestial-armor-bracelet",
    name: "Celestial Armor Bracelet",
    category: "Architecture",
    price: "$62,000",
    priceNote: "Bespoke dimensions standard",
    tagline: "Impervious elegance. Architecture for the wrist.",
    description: "Articulated nanocarbon plates. Impervious elegance for the wrist.",
    story: [
      "The Celestial Armor Bracelet was not designed — it was discovered. Early sketches described the human wrist as an architectural problem: how do you clothe power in motion? The answer arrived in the form of 23 articulated nanocarbon plates, moving in concert like the scales of something ancient and unstoppable.",
      "Each plate is CNC-milled from a single block of aerospace-grade nanocarbon — a material used in the thermal shielding of deep-space probes. It is lighter than aluminium, harder than sapphire, and warmer to the touch than any metal has a right to be.",
      "The articulation mechanism is borrowed from the hinge architecture of Byzantine armour — a system that grants full range of motion while presenting an unbroken, monolithic face to the world. Closed, it is a sculpture. Moving, it is something alive.",
      "The bracelet ships in a vault case lined with midnight-blue alcantara, accompanied by a certificate of provenance hand-signed by the atelier director and sealed with black wax bearing the ALSAERON cipher.",
    ],
    specs: [
      { label: "Primary Material", value: "Aerospace Nanocarbon — 23 articulated plates" },
      { label: "Hinge System", value: "Byzantine articulation mechanism" },
      { label: "Weight", value: "38g — lighter than titanium at equivalent volume" },
      { label: "Clasp", value: "Magnetic deployant — 40kg retention force" },
      { label: "Dimensions", value: "Bespoke to wrist circumference" },
      { label: "Edition", value: "7 per year — no two identical" },
    ],
    accentColor: "rgba(14, 165, 233, 0.18)",
    glowColor: "rgba(14, 165, 233, 0.4)",
    glowRgb: "14, 165, 233",
    shape: "hexagon",
    cardImage:
      "https://images.unsplash.com/photo-1573408301185-9521e7c58c00?w=800&auto=format&fit=crop&q=90",
    heroImage:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1800&auto=format&fit=crop&q=85",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAdjacentProducts(
  slug: string
): { prev: Product | null; next: Product | null } {
  const idx = products.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? products[idx - 1] : null,
    next: idx < products.length - 1 ? products[idx + 1] : null,
  };
}
