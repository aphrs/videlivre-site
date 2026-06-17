export default function PhoneMockup() {
  return (
    <div className="animate-float relative">
      {/* Glow */}
      <div
        className="absolute inset-0 blur-3xl opacity-20 scale-75"
        style={{ background: "radial-gradient(#1B4332, #2D6A4F)" }}
      />

      {/* Phone shell */}
      <div
        className="relative w-[260px] h-[520px] rounded-[40px] shadow-2xl border-4 border-[#1B4332] bg-[#111827] overflow-hidden"
        style={{ boxShadow: "0 40px 80px rgba(27,67,50,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)" }}
      >
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#111827] rounded-full z-10" />

        {/* Screen content */}
        <div className="w-full h-full bg-white flex flex-col">
          {/* Status bar */}
          <div className="flex justify-between items-center px-6 pt-8 pb-2">
            <span className="text-[10px] font-semibold text-[#111]">9:41</span>
            <div className="flex gap-1">
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <rect x="0" y="4" width="2" height="6" rx="0.5" fill="#111" />
                <rect x="3" y="3" width="2" height="7" rx="0.5" fill="#111" />
                <rect x="6" y="2" width="2" height="8" rx="0.5" fill="#111" />
                <rect x="9" y="0" width="2" height="10" rx="0.5" fill="#111" />
              </svg>
            </div>
          </div>

          {/* App header */}
          <div className="px-5 py-3 flex items-center gap-2 border-b border-gray-100">
            <div className="w-7 h-7 rounded-lg bg-[#1B4332] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="10" height="12" rx="1.5" fill="white" opacity="0.9" />
                <rect x="3" y="3" width="3" height="3" rx="0.5" fill="#1B4332" />
                <rect x="7" y="3" width="3" height="3" rx="0.5" fill="#1B4332" />
                <rect x="3" y="7" width="3" height="3" rx="0.5" fill="#1B4332" />
                <rect x="7" y="7" width="1.5" height="1.5" rx="0.2" fill="#F59E0B" />
              </svg>
            </div>
            <span className="text-sm font-bold text-[#1B4332]">VideLivre</span>
          </div>

          {/* Camera scan view */}
          <div className="relative flex-1 bg-gray-900 mx-4 mt-4 rounded-2xl overflow-hidden" style={{ height: "200px", maxHeight: "200px", minHeight: "200px" }}>
            {/* Camera feed simulation */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Book visual */}
              <svg width="100" height="130" viewBox="0 0 100 130" fill="none">
                <rect x="5" y="5" width="90" height="120" rx="6" fill="#E8D5B7" />
                <rect x="5" y="5" width="12" height="120" rx="3" fill="#C4A882" />
                {/* QR code on book */}
                <rect x="25" y="25" width="50" height="50" rx="3" fill="white" />
                <rect x="28" y="28" width="10" height="10" rx="1" fill="#111" />
                <rect x="29" y="29" width="8" height="8" rx="0.5" fill="white" />
                <rect x="30" y="30" width="6" height="6" rx="0.5" fill="#111" />
                <rect x="57" y="28" width="10" height="10" rx="1" fill="#111" />
                <rect x="58" y="29" width="8" height="8" rx="0.5" fill="white" />
                <rect x="59" y="30" width="6" height="6" rx="0.5" fill="#111" />
                <rect x="28" y="57" width="10" height="10" rx="1" fill="#111" />
                <rect x="29" y="58" width="8" height="8" rx="0.5" fill="white" />
                <rect x="30" y="59" width="6" height="6" rx="0.5" fill="#111" />
                <rect x="40" y="28" width="4" height="4" fill="#111" />
                <rect x="46" y="28" width="2" height="2" fill="#111" />
                <rect x="50" y="30" width="4" height="4" fill="#111" />
                <rect x="40" y="34" width="2" height="2" fill="#111" />
                <rect x="44" y="36" width="4" height="2" fill="#111" />
                <rect x="40" y="57" width="4" height="4" fill="#111" />
                <rect x="46" y="59" width="2" height="4" fill="#111" />
                <rect x="50" y="57" width="6" height="2" fill="#111" />
                <rect x="54" y="60" width="4" height="4" fill="#111" />
                <text x="16" y="100" fontFamily="serif" fontSize="9" fill="#555" fontWeight="bold">Harry Potter</text>
                <text x="20" y="112" fontFamily="serif" fontSize="7" fill="#777">J.K. Rowling</text>
              </svg>
            </div>

            {/* Scan overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Corner markers */}
              <div className="relative w-36 h-36">
                {[["top-0 left-0","border-t-2 border-l-2"],["top-0 right-0","border-t-2 border-r-2"],["bottom-0 left-0","border-b-2 border-l-2"],["bottom-0 right-0","border-b-2 border-r-2"]].map(([pos, borders], i) => (
                  <div key={i} className={`absolute w-5 h-5 ${pos} ${borders} border-[#F59E0B]`} />
                ))}
                {/* Scan line */}
                <div
                  className="scan-line absolute left-0 right-0 h-0.5 opacity-90"
                  style={{ background: "linear-gradient(90deg, transparent, #F59E0B, transparent)" }}
                />
              </div>
            </div>

            {/* Scan label */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center">
              <span className="text-[10px] text-white/70 bg-black/40 px-2 py-0.5 rounded-full">Scannez le QR code du livre</span>
            </div>
          </div>

          {/* Bottom card - book info */}
          <div className="mx-4 mt-4 p-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full bg-[#22c55e] flex items-center justify-center">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[10px] font-semibold text-[#15803D]">Livre identifié !</span>
            </div>
            <p className="text-xs font-bold text-[#111]">Harry Potter à l&apos;école des sorciers</p>
            <p className="text-[10px] text-[#6B7280]">J.K. Rowling · Gallimard Jeunesse · 1998</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] text-[#6B7280]">Prix suggéré</span>
              <span className="text-sm font-bold text-[#F59E0B]">6 €</span>
            </div>
          </div>

          {/* CTA button */}
          <div className="px-4 pt-3 pb-5">
            <div
              className="w-full py-2.5 rounded-xl text-white text-sm font-semibold text-center"
              style={{ background: "linear-gradient(135deg, #1B4332, #2D6A4F)" }}
            >
              Publier l&apos;annonce →
            </div>
          </div>
        </div>
      </div>

      {/* Badge flottant */}
      <div
        className="absolute -right-4 top-1/4 bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 border border-[#E5E7E0]"
        style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
      >
        <div className="w-8 h-8 rounded-xl bg-[#FEF3C7] flex items-center justify-center text-base">⚡</div>
        <div>
          <p className="text-[10px] text-[#6B7280] leading-none mb-0.5">Temps moyen</p>
          <p className="text-xs font-bold text-[#111]">28 secondes</p>
        </div>
      </div>

      {/* Badge vendu */}
      <div
        className="absolute -left-8 bottom-1/3 bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 border border-[#E5E7E0]"
        style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
      >
        <div className="w-8 h-8 rounded-xl bg-[#D1FAE5] flex items-center justify-center text-base">📚</div>
        <div>
          <p className="text-[10px] text-[#6B7280] leading-none mb-0.5">Annonce publiée</p>
          <p className="text-xs font-bold text-[#15803D]">Vendu en 2 jours !</p>
        </div>
      </div>
    </div>
  );
}
