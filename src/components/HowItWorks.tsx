const steps = [
  {
    number: "01",
    emoji: "📷",
    title: "Scannez",
    description:
      "Ouvrez VideLivre et pointez votre caméra sur le QR code au dos du livre. La reconnaissance est instantanée.",
    color: "#E8F5E9",
    accent: "#1B4332",
  },
  {
    number: "02",
    emoji: "✅",
    title: "Vérifiez",
    description:
      "Titre, auteur, résumé, couverture — tout est pré-rempli automatiquement. Ajustez si besoin, puis fixez votre prix.",
    color: "#FEF9E7",
    accent: "#B45309",
  },
  {
    number: "03",
    emoji: "🚀",
    title: "Publiez",
    description:
      "En un tap, votre annonce est en ligne et visible par des milliers d'acheteurs près de chez vous.",
    color: "#E0F2FE",
    accent: "#0369A1",
  },
];

export default function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#1B4332] uppercase tracking-widest mb-4">
            Comment ça marche
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Trois étapes, c&apos;est tout
          </h2>
          <p className="mt-4 text-lg text-[#6B7280] max-w-xl mx-auto">
            Fini de taper manuellement les informations. VideLivre fait le travail à votre place.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-px bg-gradient-to-r from-[#E5E7E0] via-[#1B4332]/30 to-[#E5E7E0]" />

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                {/* Icon circle */}
                <div
                  className="relative w-28 h-28 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-sm transition-transform group-hover:-translate-y-1 duration-300"
                  style={{ background: step.color }}
                >
                  {step.emoji}
                  {/* Step number badge */}
                  <div
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full text-white text-xs font-extrabold flex items-center justify-center shadow-sm"
                    style={{ background: step.accent }}
                  >
                    {step.number.slice(1)}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#111827] mb-3">{step.title}</h3>
                <p className="text-[#6B7280] leading-relaxed text-sm">{step.description}</p>

                {/* Arrow between steps */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-14 -right-6 text-[#E5E7E0]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M14 7l5 5-5 5" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="#beta"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #1B4332, #2D6A4F)" }}
          >
            Essayer maintenant — c&apos;est gratuit
          </a>
        </div>
      </div>
    </section>
  );
}
