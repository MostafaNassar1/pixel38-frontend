import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-card-brown/40 mt-20 px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
        <div className="flex items-center">
  <Image
    src="/logo.png"
    alt="BIO CWT"
    width={160}
    height={64}
    className="h-10 md:h-12 w-auto brightness-0 invert"
  />
</div>

        <div className="flex items-center gap-3 text-foreground">
          <PhoneIcon />
          <span>+420 000 000 000</span>
        </div>

        <div className="flex items-center gap-3 text-foreground">
          <PinIcon />
          <span>
            Na Plzeňce 1166/0
            <br />
            150 00
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8">
        <a href="/privacy-policy" className="text-muted text-sm hover:text-foreground transition-colors">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}

function LogoIcon() {
  return (
    <div className="w-10 h-10 border-2 border-foreground rounded-lg flex items-center justify-center overflow-hidden">
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <path d="M0 10 Q10 5 20 15 T40 12" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M0 20 Q12 15 20 25 T40 22" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M0 30 Q10 25 20 32 T40 30" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    </div>
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