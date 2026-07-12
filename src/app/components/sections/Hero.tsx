import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-card-brown rounded-3xl mx-4 md:mx-8 mt-6 p-8 md:p-14 relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center gap-10 relative z-10">
        <div className="flex-1">
          <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wide leading-tight text-foreground">
            Solid Wood
            <br />
            Products
          </h1>

          <p className="mt-6 text-muted">
            Oak, beech, ash from{" "}
            <span className="text-foreground font-semibold">1700 CZK</span> per m3
          </p>

          <button className="mt-6 bg-accent-blue text-foreground font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
            Order
          </button>
        </div>

        <div className="hidden md:block relative w-full md:w-205 h-95 shrink-0">
          <div className="absolute top-0 right-40 w-36 h-36 rounded-2xl overflow-hidden shadow-lg">
            <Image src="/hero/image.png" alt="Assembling wooden furniture" fill className="object-cover" />
          </div>
          <div className="absolute top-50 right-5 w-52 h-52 rounded-2xl overflow-hidden shadow-lg">
            <Image src="/hero/image1.png" alt="Spiral wooden staircase" fill className="object-cover" />
          </div>
          <div className="absolute bottom-5 left-32 w-44 h-44 rounded-2xl overflow-hidden shadow-lg">
            <Image src="/hero/image2.png" alt="Wooden table" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}