"use client";
import { useState } from "react";

export default function BetaCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call – replace with your actual endpoint
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section id="beta" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center"
          style={{
            background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #1B4332 100%)",
          }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>

          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
              <span className="text-xs font-semibold text-[#FCD34D] uppercase tracking-wide">
                Beta ouverte — Gratuit
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Prêt à vider votre
              <br />
              bibliothèque ?
            </h2>
            <p className="text-white/70 text-lg max-w-md mx-auto mb-10">
              Rejoignez la beta et publiez votre première annonce en moins d&apos;une minute.
              Aucune carte bancaire requise.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="flex-1 px-4 py-3.5 rounded-full bg-white/15 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#F59E0B] focus:bg-white/20 transition-all text-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3.5 rounded-full font-semibold text-[#1B4332] text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70"
                  style={{ background: loading ? "#FCD34D" : "#F59E0B" }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
                      </svg>
                      Envoi...
                    </span>
                  ) : (
                    "Accéder à la beta →"
                  )}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#22c55e]/20 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M6 16l7 7L26 9" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-lg">Vous êtes sur la liste ! 🎉</p>
                <p className="text-white/60 text-sm">On vous envoie votre accès très bientôt.</p>
              </div>
            )}

            {/* Trust signals */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/50">
              {["✓ 100% gratuit", "✓ Sans CB", "✓ Données protégées"].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
