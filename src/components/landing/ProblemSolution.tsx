import ScrollReveal from "./ScrollReveal";

export default function ProblemSolution() {
  return (
    <ScrollReveal as="section" className="bg-white px-4 py-24 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="caption-3 uppercase tracking-wide text-muted-foreground">
            The problem
          </p>
          <h2 className="heading-4 mt-3 text-foreground">
            Too many vendors. Too little ownership.
          </h2>
          <p className="body-3 mt-4 text-muted-foreground">
            Growing teams juggle agencies for marketing, freelancers for web,
            and separate partners for storefronts or rentals. Handoffs stall,
            quality drifts, and nobody owns the outcome end to end.
          </p>
        </div>
        <div>
          <p className="caption-3 uppercase tracking-wide text-muted-foreground">
            Our approach
          </p>
          <h2 className="heading-4 mt-3 text-foreground">
            One group. Live ventures. Shared standards.
          </h2>
          <p className="body-3 mt-4 text-muted-foreground">
            Zairo runs real brands across rentals, digital marketing, ecommerce,
            and leather goods. You work with a team that already ships and
            supports products every day, not a pitch deck that ends after launch.
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}
