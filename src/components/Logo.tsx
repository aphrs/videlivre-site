export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="VideLivre"
    >
      {/* Book icon */}
      <rect x="1" y="5" width="22" height="26" rx="3" fill="#1B4332" />
      <rect x="4" y="8" width="16" height="20" rx="1.5" fill="#FAFAF7" />
      {/* ISBN barcode on book */}
      <rect x="6" y="10" width="1.5" height="14" fill="#1B4332" />
      <rect x="8.5" y="10" width="1" height="14" fill="#1B4332" />
      <rect x="10.5" y="10" width="2" height="14" fill="#1B4332" />
      <rect x="13.5" y="10" width="1" height="14" fill="#1B4332" />
      <rect x="15.5" y="10" width="1.5" height="14" fill="#F59E0B" />
      {/* Spine line */}
      <rect x="1" y="5" width="3" height="26" rx="1" fill="#2D6A4F" />
      {/* Scan beam */}
      <line x1="26" y1="18" x2="32" y2="18" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <circle cx="33" cy="18" r="2" fill="#F59E0B" />
      {/* Wordmark */}
      <text
        x="38"
        y="24"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        fontSize="18"
        fill="#1B4332"
        letterSpacing="-0.5"
      >
        Vide
      </text>
      <text
        x="80"
        y="24"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        fontSize="18"
        fill="#F59E0B"
        letterSpacing="-0.5"
      >
        Livre
      </text>
    </svg>
  );
}
