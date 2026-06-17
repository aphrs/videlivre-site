const stats = [
  { value: "2 500+", label: "Livres mis en vente", icon: "📚" },
  { value: "48h",    label: "Délai de vente moyen", icon: "⏱️" },
  { value: "30 sec", label: "Pour créer une annonce", icon: "⚡" },
  { value: "4.8/5",  label: "Note des utilisateurs", icon: "⭐" },
];

const testimonials = [
  {
    quote: "J'ai vidé ma bibliothèque en un week-end. Avant j'aurais abandonné après 3 annonces.",
    name: "Marie L.",
    role: "Lectrice passionnée, Lyon",
    avatar: "M",
    color: "#D4A574",
  },
  {
    quote: "L'app est incroyablement rapide. Scanner, valider, publier — c'est littéralement 30 secondes.",
    name: "Simon R.",
    role: "Étudiant, Paris",
    avatar: "S",
    color: "#34D399",
  },
  {
    quote: "Le prix suggéré est vraiment pertinent. J'ai vendu 90% de mes livres au premier prix affiché.",
    name: "Aurélie B.",
    role: "Libraire indépendante, Bordeaux",
    avatar: "A",
    color: "#F472B6",
  },
];

export default function Stats() {
  return (
    <section className="py-24 bg-[#1B4332]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-4xl font-extrabold text-white mb-1">{s.value}</div>
              <div className="text-sm text-[#86EFAC] font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <h2 className="text-center text-2xl font-extrabold text-white mb-10">
            Ils ont déjà vidé leur bibliothèque 📖
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors"
              >
                {/* Quote marks */}
                <div className="text-[#F59E0B] text-4xl font-serif leading-none mb-3">&ldquo;</div>
                <p className="text-white/90 text-sm leading-relaxed mb-6">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ background: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-white/50 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
