"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import {
  TestimonialGlobe,
  type GlobeTestimonial,
} from "@/components/ui/testimonial-globe";

// Mix: ~60% India, ~30% Greece, ~10% other. Coordinates real. Portraits: Unsplash.
const REVIEWS: GlobeTestimonial[] = [
  // India (6)
  {
    id: "mumbai",
    quote:
      "The reports are clear enough to share with leadership as they are. That alone saves my team hours every month.",
    name: "Ananya Iyer",
    role: "Head of Data",
    company: "Monsoon Analytics",
    city: "Mumbai",
    country: "IN",
    lat: 19.08,
    lng: 72.88,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    tone: 1,
  },
  {
    id: "delhi",
    quote:
      "Zairo built our brand system and launch path like they owned the outcome. No agency hand-off gaps.",
    name: "Rohan Mehta",
    role: "Founder",
    company: "Northgate Ventures",
    city: "New Delhi",
    country: "IN",
    lat: 28.61,
    lng: 77.21,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    tone: 2,
  },
  {
    id: "bengaluru",
    quote:
      "Two engineers had our product surface live within a week. Cleanest integration we shipped this year.",
    name: "Priya Nair",
    role: "CTO",
    company: "Cedar Labs",
    city: "Bengaluru",
    country: "IN",
    lat: 12.97,
    lng: 77.59,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    tone: 3,
  },
  {
    id: "hyderabad",
    quote:
      "Marketing craft showed up in week one. Customers noticed faster replies before we announced anything.",
    name: "Karthik Reddy",
    role: "Growth Lead",
    company: "Deccan Commerce",
    city: "Hyderabad",
    country: "IN",
    lat: 17.39,
    lng: 78.49,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 4,
    tone: 5,
  },
  {
    id: "chennai",
    quote:
      "Onboarding a new client used to mean a week of calls. Most are set up before our first meeting now.",
    name: "Lakshmi Krishnan",
    role: "Client Success Director",
    company: "Bayfront Soft",
    city: "Chennai",
    country: "IN",
    lat: 13.08,
    lng: 80.27,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    tone: 1,
  },
  {
    id: "kanpur",
    quote:
      "Local partner that thinks like a product company. Our storefront finally matches the brand we wanted.",
    name: "Amit Saxena",
    role: "Managing Director",
    company: "Ganges Retail",
    city: "Kanpur",
    country: "IN",
    lat: 26.45,
    lng: 80.33,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    tone: 2,
  },
  // Greece (3)
  {
    id: "athens",
    quote:
      "Housing discovery for buyers and Golden Visa journeys finally sits on one clear product. Guests and agents both get it.",
    name: "Nikos Papadopoulos",
    role: "Operations Director",
    company: "Aegean Homes",
    city: "Athens",
    country: "GR",
    lat: 37.98,
    lng: 23.73,
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    tone: 3,
  },
  {
    id: "thessaloniki",
    quote:
      "Holiday stays and monthly rentals needed a real platform, not a brochure site. Zairo delivered both.",
    name: "Eleni Kostas",
    role: "Founder",
    company: "Thermaikos Stays",
    city: "Thessaloniki",
    country: "GR",
    lat: 40.64,
    lng: 22.94,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    tone: 5,
  },
  {
    id: "heraklion",
    quote:
      "Property listings across islands stayed in sync for the first time. Support answers quickly, day or night.",
    name: "Dimitris Antonis",
    role: "COO",
    company: "Cretan Residence",
    city: "Heraklion",
    country: "GR",
    lat: 35.34,
    lng: 25.13,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 4,
    tone: 1,
  },
  // Other (1)
  {
    id: "dubai",
    quote:
      "Cross-border ops finally share one dashboard. Zairo treated our brand like one of their own ventures.",
    name: "Layla Rahman",
    role: "COO",
    company: "Gulf Residence",
    city: "Dubai",
    country: "AE",
    lat: 25.2,
    lng: 55.27,
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    tone: 2,
  },
];

/**
 * Same navy band as FeaturedProjects (`#070f18`).
 * `dark` scopes shadcn tokens so globe, cards, and copy match that section.
 * Chart-4 amber keeps rating stars readable (global chart-4 is steel-white).
 */
const SECTION_STYLE = {
  ["--background" as string]: "210 58% 6%",
  ["--color-background" as string]: "#070f18",
  ["--card" as string]: "210 40% 10%",
  ["--color-card" as string]: "hsl(210 40% 10%)",
  ["--border" as string]: "0 0% 100% / 0.1",
  ["--chart-4" as string]: "38 85% 55%",
};

export default function TestimonialsGlobe() {
  return (
    <div
      id="voices"
      className="dark scroll-mt-28 bg-[#070f18] text-white"
      style={SECTION_STYLE}
    >
      <TestimonialGlobe
        items={REVIEWS}
        heading="Partners across markets, in their own words."
        caption="Mostly India and Greece — operators and founders who built with Zairo."
        autoplay
        interval={3000}
        className="bg-background"
        action={
          <Link
            href="/contact"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Talk to us
            <ArrowRight weight="bold" className="size-3.5" aria-hidden />
          </Link>
        }
      />
    </div>
  );
}
