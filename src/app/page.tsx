import PageTransition from "@/components/page-transition";
import {
  LandingHero,
  Services,
  FeaturedProjects,
  About,
  Team,
  TestimonialsGlobe,
  FinalCta,
} from "@/components/landing";

/**
 * Homepage structure (lean company brand page):
 * 1. Hero         — brand identity
 * 2. Capabilities — what Zairo does
 * 3. Ventures     — products with their own sites
 * 4. Company      — who we are
 * 5. Voices       — partner testimonials (globe)
 * 6. Team         — people (API)
 * 7. CTA          — contact close
 */
export default function Home() {
  return (
    <PageTransition>
      <main id="main-content">
        <LandingHero />
        <Services />
        <FeaturedProjects />
        <About />
        <TestimonialsGlobe />
        <Team />
        <FinalCta />
      </main>
    </PageTransition>
  );
}
