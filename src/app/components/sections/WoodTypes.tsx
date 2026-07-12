import Image from "next/image";
import { getProducts } from "../../lib/api";

export default async function WoodTypes() {
  const products = await getProducts();

  return (
    <section className="px-4 md:px-8 mt-20">
      <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-foreground max-w-md">
        The Wood We Work With
      </h2>

      <div className="mt-10 flex gap-8 overflow-x-auto md:overflow-visible md:grid md:grid-cols-3 pb-4 md:pb-0">
        {products.map((product) => (
          <div key={product.id} className="shrink-0 w-40 md:w-auto">
            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden">
              {product.images[0] && (
                <Image
                  src={`http://localhost:3000${product.images[0].imageUrl}`}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 112px, 144px"
                  className="object-cover"
                />
              )}
            </div>

            <h3 className="mt-4 font-semibold text-lg text-foreground">{product.name}</h3>

            <ul className="mt-2 space-y-1">
              {product.traits?.map((trait) => (
                <li key={trait.label} className="flex items-start gap-2 text-sm text-muted">
                  {trait.positive ? <CheckIcon /> : <CrossIcon />}
                  <span>{trait.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
      <path d="M3 8l3.5 3.5L13 5" stroke="var(--color-accent-orange)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
      <path d="M4 4l8 8M12 4l-8 8" stroke="var(--color-accent-orange)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}