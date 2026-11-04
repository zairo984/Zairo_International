import {
  Buildings,
  GlobeHemisphereWest,
  Handshake,
  Lightning,
  Headset,
} from "@phosphor-icons/react/dist/ssr";
import ScrollReveal from "./ScrollReveal";

const benefits = [
  {
    icon: Buildings,
    title: "Ventures you can visit",
    detail:
      "Vacation Saga, Shopobar, Cordscraft, and Tech Tunes are live brands, not concept slides.",
  },
  {
    icon: Handshake,
    title: "One accountable partner",
    detail:
      "Strategy, build, and ongoing support stay with the same group so handoffs stop eating weeks.",
  },
  {
    icon: Lightning,
    title: "Ideas shaped into products",
    detail:
      "We take practical business ideas and turn them into operable brands with clear next steps.",
  },
  {
    icon: GlobeHemisphereWest,
    title: "Reach beyond one market",
    detail:
      "Property rentals abroad and online storefronts give you paths that already cross borders.",
  },
  {
    icon: Headset,
    title: "Reach us round the clock",
    detail:
      "Website and help desk channels stay open so questions do not wait for the next workday.",
  },
];

export default function Benefits() {
  return (
    <ScrollReveal
      as="section"
      className="bg-white px-4 py-24 sm:px-6 sm:py-24"
      id="benefits"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-[680px]">
          <h2 className="heading-3 text-foreground">
            What working with Zairo gets you
          </h2>
          <p className="body-3 mt-4 text-muted-foreground">
            Outcomes first. Features come with the brands we already run.
          </p>
        </div>

        <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, detail }) => (
            <li key={title} className="flex flex-col gap-3">
              <Icon
                weight="duotone"
                className="h-8 w-8 text-primary"
                aria-hidden
              />
              <h3 className="title-1 text-foreground">{title}</h3>
              <p className="body-6 text-muted-foreground">{detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );
}
