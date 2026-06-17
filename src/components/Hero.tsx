import PhoneMockup from "./PhoneMockup";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FAFAF7]">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #1B4332, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #F59E0B, transparent 70%)" }}
        />
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1B4332" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: Text */}
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full border border-[#E5E7E0] bg-white/80 backdrop-blur-sm shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-xs font-semibold text-[#1B4332] uppercase tracking-wide">Beta disponible maintenant</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-[#111827]">
            Vendez vos livres
            <br />
            <span
              className="relative"
              style={{
                background: "linear-gradient(135deg, #1B4332, #2D6A4F)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              en 30 secondes
            </span>
          </h1>

          {/* Subline */}
          <p className="text-lg text-[#4B5563] leading-relaxed max-w-md">
            Scannez le QR code de votre livre — VideLivre remplit automatiquement
            titre, auteur et description. Il ne vous reste qu&apos;à fixer le prix
            et publier.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#beta"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #1B4332, #2D6A4F)" }}
            >
              Accéder à la beta gratuite
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#comment-ca-marche"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[#1B4332] border border-[#E5E7E0] bg-white hover:bg-[#F5F5F0] transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="#1B4332" strokeWidth="1.5" />
                <path d="M6 8.5L8 10.5L10.5 7" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Comment ça marche
            </a>
          </div>

          {/* Social proof micro */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex -space-x-2">
              {["#D4A574","#A78BFA","#34D399","#F472B6"].map((c, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: c }}
                >
                  {["M","L","S","A"][i]}
                </div>
              ))}
            </div>
            <p className="text-sm text-[#6B7280]">
              <strong className="text-[#111827]">2 500+</strong> livres déjà mis en vente
            </p>
          </div>
        </div>

        {/* Right: Phone mockup */}
        <div className="flex justify-center lg:justify-end">
          <PhoneMockup />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 8l5 5 5-5" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
