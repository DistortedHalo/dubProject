import type { SiteContent } from "../types";

type FooterProps = {
  onLearnMore?: () => void;
  onHome?: () => void;
  content: SiteContent;
};

export function Footer({ onLearnMore, onHome, content }: FooterProps) {
  return (
    <footer className="border-t border-white/10 px-0 py-10">
      <div className="container-shell grid gap-8 text-sm text-white/45 md:grid-cols-3">
        <div>
          <button type="button" onClick={onHome} className="text-left">
            <div className="text-3xl font-semibold tracking-tight text-white transition hover:opacity-90">
              <span className="text-[#7B3FB6]">DUB</span>SYNC
            </div>
          </button>
          <p className="mt-3">{content.footerTagline}</p>
          <button type="button" onClick={onLearnMore} className="mt-4 inline-flex items-center text-white/70 transition hover:text-white">
            Learn more
          </button>
        </div>
        <div className="space-y-2">
          <p>hello@dubsync.com</p>
          <p>{content.footerLocation}</p>
        </div>
        <div className="md:text-right">
          <p>{content.footerPartnership}</p>
          <p className="mt-1">{content.footerPartners}</p>
        </div>
      </div>
    </footer>
  );
}
