import Image from "next/image";

export default function AboutUs() {
  return (
    <section className="bg-card-brown rounded-3xl mx-4 md:mx-8 mt-20 p-8 md:p-14">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-foreground">
            About Us
          </h2>

          <p className="mt-6 text-muted leading-relaxed max-w-md">
            <span className="text-foreground font-semibold">BIO CWT</span> - We
            manufacture solid wood products according to individual drawings.
            We make chairs, armchairs, wardrobes, beds and much more in our
            own workshop, equipped with all the necessary industrial
            equipment.
          </p>
        </div>

        <div className="relative w-full md:w-96 h-72 md:h-80 shrink-0">
          <div className="absolute top-0 left-0 w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-lg">
            <Image src="/about/measuring.png" alt="Craftsman in workshop" fill className="object-cover" />
          </div>
          <div className="absolute top-4 right-0 w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-lg">
            <Image src="/about/workshop.png" alt="Hands working with wood" fill className="object-cover" />
          </div>
          <div className="absolute bottom-0 right-8 w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden shadow-lg">
            <Image src="/about/hands-wood.png" alt="Measuring wood plank" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}