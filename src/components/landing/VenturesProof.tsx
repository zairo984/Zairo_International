import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const ventures = [
  {
    name: "Vacation Saga",
    blurb: "Property rentals that help guests find outstanding stays abroad.",
  },
  {
    name: "Tech Tunes",
    blurb: "Web development and digital marketing under one operating brand.",
  },
  {
    name: "Shopobar",
    blurb: "Ecommerce storefront built to bring products to buyers online.",
  },
  {
    name: "Cordscraft",
    blurb: "Leather goods sold online with a focus on craft and finish.",
  },
];

export default function VenturesProof() {
  return (
    <ScrollReveal
      as="section"
      id="ventures"
      className="bg-white px-4 py-24 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-[680px]">
          <h2 className="heading-3 text-foreground">Brands already in motion</h2>
          <p className="body-3 mt-4 text-muted-foreground">
            Proof sits in the products we run every day. No borrowed logos.
          </p>
        </div>

        <ul className="mt-16 grid gap-8 sm:grid-cols-2">
          {ventures.map((venture) => (
            <li
              key={venture.name}
              className="rounded-2xl border border-border bg-[#F5F5F5] p-6"
            >
              <h3 className="title-1 text-foreground">{venture.name}</h3>
              <p className="body-6 mt-2 text-muted-foreground">{venture.blurb}</p>
            </li>
          ))}
        </ul>

        <p className="body-6 mt-10 text-muted-foreground">
          Want the full story?{" "}
          <Link
            href="/about"
            className="body-4 text-foreground underline underline-offset-4 transition-opacity duration-300 ease-motion hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Read about Zairo
          </Link>
        </p>
      </div>
    </ScrollReveal>
  );
}
