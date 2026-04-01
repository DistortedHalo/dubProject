type LogoStampProps = {
  onClick?: () => void;
};

export function LogoStamp({ onClick }: LogoStampProps) {
  return (
    <button type="button" onClick={onClick} className="logo-stamp" aria-label="Go to home">
      <div className="logo-stamp-inner transition-all duration-300 ease-out hover:scale-105 hover:brightness-125 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]">
        <span className="logo-dub font-bold transition-all duration-300 hover:text-white/75">DUB</span>
        <span className="logo-sync font-bold transition-all duration-300">SYNC</span>
      </div>
    </button>
  );
}
