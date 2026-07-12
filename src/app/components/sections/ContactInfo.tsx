export default function ContactInfo() {
  return (
    <section className="px-4 md:px-8 mt-10">
      <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wide text-foreground">
        Contact
      </h1>

      <div className="mt-10 flex flex-col md:flex-row gap-10 md:items-start">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3 text-foreground text-lg">
            <PhoneIcon />
            <span>+420 000 000 000</span>
          </div>
          <div className="flex items-center gap-3 text-foreground text-lg">
            <PinIcon />
            <span>
              Na Plzeňce 1166/0
              <br />
              150 00
            </span>
          </div>
        </div>

        <div className="flex-1 rounded-3xl overflow-hidden h-64 md:h-80">
          <iframe
            src="https://www.google.com/maps?q=Na+Plzence+1166,Prague&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            title="Location map"
          />
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s7-6.5 7-11.5a7 7 0 10-14 0C5 14.5 12 21 12 21z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}