import Image from "next/image";

const ADVANTAGES = [
  "In-house carpentry production",
  "We only treat wood with environmentally friendly and safe products",
  "Prices from the manufacturer, no extra charges",
];

export default function Advantages() {
  return (
    <section className="px-4 md:px-8 mt-20">
      <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-foreground max-w-md">
        Advantages Working With Us
      </h2>

      <div className="mt-10 flex flex-col md:flex-row gap-8 md:items-center">
        <div className="relative w-full md:w-80 h-56 md:h-64 rounded-3xl overflow-hidden shrink-0">
          <Image src="/advantages/staircase.png" alt="Wooden staircase detail" fill className="object-cover" />
        </div>

        <div className="flex-1">
          <ul className="space-y-4">
            {ADVANTAGES.map((advantage) => (
              <li key={advantage} className="text-foreground">
                {advantage}
              </li>
            ))}
          </ul>

          <button className="mt-8 bg-accent-blue text-foreground font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
            Receive a consultation
          </button>
        </div>
      </div>
    </section>
  );
}