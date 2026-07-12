type PriceRow = { length: number; width: number; thickness: number };
type PriceCalc = { m3: number; pricePerM3: number; pricePerPiece: number };

const DIMENSIONS: PriceRow[] = [
  { length: 1000, width: 300, thickness: 40 },
  { length: 1100, width: 300, thickness: 40 },
  { length: 800, width: 300, thickness: 40 },
  { length: 900, width: 300, thickness: 40 },
];

const CALCULATIONS: PriceCalc[] = [
  { m3: 0.012, pricePerM3: 1100, pricePerPiece: 462 },
  { m3: 0.0132, pricePerM3: 1100, pricePerPiece: 508.2 },
  { m3: 0.0096, pricePerM3: 1100, pricePerPiece: 369.6 },
  { m3: 0.0108, pricePerM3: 1100, pricePerPiece: 415.8 },
];

export default function PriceList() {
  return (
    <section className="px-4 md:px-8 mt-10">
      <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-foreground">
        Price List
      </h1>

      <div className="mt-10 flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-neutral-200 text-neutral-900 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-400">
                <th className="text-left font-bold p-4">buk pr</th>
                <th className="text-left font-bold p-4">délka</th>
                <th className="text-left font-bold p-4">šiřka</th>
                <th className="text-left font-bold p-4">tloustka</th>
              </tr>
            </thead>
            <tbody>
              {DIMENSIONS.map((row, i) => (
                <tr key={i} className="border-b border-neutral-300 last:border-0">
                  <td className="p-4"></td>
                  <td className="p-4">{row.length}</td>
                  <td className="p-4">{row.width}</td>
                  <td className="p-4">{row.thickness}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex-1 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-400 bg-neutral-200 text-neutral-900">
                <th className="text-left font-bold p-4">m3</th>
                <th className="text-left font-bold p-4">cena m3</th>
                <th className="text-left font-bold p-4 bg-accent-orange">cena ks.</th>
              </tr>
            </thead>
            <tbody className="bg-neutral-200 text-neutral-900">
              {CALCULATIONS.map((row, i) => (
                <tr key={i} className="border-b border-neutral-300 last:border-0">
                  <td className="p-4">{row.m3}</td>
                  <td className="p-4">{row.pricePerM3}</td>
                  <td className="p-4 bg-accent-orange/70">{row.pricePerPiece}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}