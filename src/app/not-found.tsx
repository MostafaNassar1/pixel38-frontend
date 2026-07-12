import Link from "next/link";
import Header from "./components/layout/Header";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[url('/hero/wood-bg.png')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-background/70" />
      <div className="relative z-10">
        <Header />
        <div className="px-4 md:px-8 mt-24 text-center">
          <h1 className="font-display text-8xl md:text-9xl font-bold text-foreground">404</h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-2">Woops</h2>
          <p className="text-accent-orange mt-4">
            Oh, you must be lost, there is no such page.
          </p>
          <Link
            href="/"
            className="inline-block mt-8 bg-accent-blue text-foreground font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Go to the home page
          </Link>
        </div>
      </div>
    </div>
  );
}
