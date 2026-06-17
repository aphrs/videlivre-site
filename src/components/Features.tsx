const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Ultra-rapide",
    description: "30 secondes vs 5 minutes en moyenne sur les autres plateformes. Le temps, c'est de l'argent.",
    bg: "#E8F5E9",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="#1B4332" strokeWidth="1.8" />
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="#1B4332" strokeWidth="1.8" />
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="#1B4332" strokeWidth="1.8" />
        <rect x="16" y="16" width="3" height="3" fill="#1B4332" />
        <rect x="14" y="14" width="3" height="3" fill="#1B4332" />
        <rect x="18" y="14" width="3" height="3" fill="#1B4332" />
      </svg>
    ),
    title: "Scan QR intelligent",
    description: "Reconnaissance instantanée via le QR code ou le code-barres ISBN. Compatible avec 10 millions de livres.",
    bg: "#EFF6FF",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#1B4332" strokeWidth="1.8" />
        <circle cx="8.5" cy="8.5" r="1.5" stroke="#1B4332" strokeWidth="1.5" />
        <path d="M21 15l-5-5L5 21" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Photos automatiques",
    description: "La couverture du livre est récupérée automatiquement en haute qualité depuis notre base de données.",
    bg: "#FEF9E7",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Prix suggéré par l'IA",
    description: "VideLivre analyse les ventes récentes pour vous suggérer le prix idéal et maximiser vos chances de vente.",
    bg: "#F5F3FF",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Alertes acheteurs",
    description: "Des lecteurs cherchent activement vos livres. Ils reçoivent une notification dès que votre annonce est publiée.",
    bg: "#FFF7ED",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#1B4332" strokeWidth="1.8" />
        <path d="M12 8v4l3 3" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 12c0-2.761 2.239-5 5-5" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Économie circulaire",
    description: "Chaque livre revendu est un livre sauvé. VideLivre encourage la seconde vie des objets culturels.",
    bg: "#ECFDF5",
  },
];

export default function Features() {
  return (
    <section id="fonctionnalites" className="py-24 bg-[#FAFAF7]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#1B4332]/10 text-[#1B4332] uppercase tracking-widest mb-4">
            Fonctionnalités
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Tout ce dont vous avez besoin,
            <br />
            <span className="text-[#1B4332]">rien de superflu</span>
          </h2>
          <p className="mt-4 text-lg text-[#6B7280] max-w-lg mx-auto">
            VideLivre est pensé pour que vendre un livre soit aussi simple que de l&apos;offrir.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl bg-white border border-[#E5E7E0] hover:border-[#1B4332]/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300"
                style={{ background: f.bg }}
              >
                {f.icon}
              </div>
              <h3 className="text-base font-bold text-[#111827] mb-2">{f.title}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
