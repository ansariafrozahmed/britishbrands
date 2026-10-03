const phrases = [
  "Long-lasting Eau de Parfum",
  "Curated Luxury Brands",
  "Exclusive Fragrance Collections",
  "Experience in-store",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {phrases.map((phrase) => (
        <span key={phrase} className="flex items-center gap-10">
          <span className="text-[11px] font-light uppercase tracking-[0.3em]">
            {phrase}
          </span>
          <span aria-hidden className="text-[8px] text-gold-light">
            ◆
          </span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div aria-hidden className="overflow-hidden bg-charcoal py-4 text-white/90">
      <div className="animate-marquee flex w-max">
        <Row />
        <Row />
      </div>
    </div>
  );
}
