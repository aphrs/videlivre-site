"use client";
import { useState, useRef, useCallback } from "react";

interface Book {
  titre: string;
  auteur: string | null;
  editeur: string | null;
}

interface DetectionResult {
  livres: Book[];
  total: number;
  note?: string;
}

interface Props {
  onClose: () => void;
}

export default function BookDetectionModal({ onClose }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<string>("image/jpeg");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Veuillez sélectionner une image.");
      return;
    }
    setError(null);
    setResult(null);
    setMediaType(file.type as string);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleAnalyze = async () => {
    if (!preview) return;
    setLoading(true);
    setError(null);

    try {
      const base64 = preview.split(",")[1];
      const res = await fetch("/api/detect-books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64, mediaType }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur serveur");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPreview(null);
    setResult(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7E0]">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#1B4332]/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B4332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </span>
            <div>
              <h2 className="text-base font-bold text-[#111827]">Détection de livres</h2>
              <p className="text-xs text-[#6B7280]">Analyse les tranches de vos livres par IA</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#F3F4F6] transition-colors"
            aria-label="Fermer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Upload zone */}
          {!preview ? (
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                dragOver
                  ? "border-[#1B4332] bg-[#1B4332]/5"
                  : "border-[#E5E7E0] hover:border-[#1B4332]/40 hover:bg-[#FAFAF7]"
              }`}
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#1B4332]/10 flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">Glissez une photo ou cliquez pour choisir</p>
                  <p className="text-xs text-[#6B7280] mt-1">JPG, PNG, WEBP — photo de votre bibliothèque</p>
                </div>
              </div>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Image preview */}
              <div className="relative rounded-xl overflow-hidden bg-[#F3F4F6] border border-[#E5E7E0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Aperçu" className="w-full max-h-64 object-contain" />
                <button
                  onClick={handleReset}
                  className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg p-1.5 hover:bg-white transition-colors shadow-sm"
                  aria-label="Changer l'image"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Analyze button */}
              {!result && (
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#1B4332] text-white text-sm font-semibold hover:bg-[#2D6A4F] transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Analyse en cours…
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                      </svg>
                      Détecter les livres
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
              <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#111827]">
                  {result.total > 0
                    ? `${result.total} livre${result.total > 1 ? "s" : ""} détecté${result.total > 1 ? "s" : ""}`
                    : "Aucun livre détecté"}
                </h3>
                <button
                  onClick={handleReset}
                  className="text-xs text-[#1B4332] font-medium hover:underline"
                >
                  Nouvelle photo
                </button>
              </div>

              {result.note && (
                <p className="text-xs text-[#6B7280] italic">{result.note}</p>
              )}

              {result.livres.length > 0 && (
                <ul className="space-y-2">
                  {result.livres.map((book, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-[#FAFAF7] border border-[#E5E7E0] hover:border-[#1B4332]/30 transition-colors"
                    >
                      <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-[#1B4332]/10 text-xs font-bold text-[#1B4332]">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#111827] leading-tight">{book.titre}</p>
                        {book.auteur && (
                          <p className="text-xs text-[#6B7280] mt-0.5">{book.auteur}</p>
                        )}
                        {book.editeur && (
                          <p className="text-xs text-[#9CA3AF]">{book.editeur}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="pt-2 border-t border-[#E5E7E0]">
                <p className="text-xs text-[#9CA3AF] text-center">
                  Propulsé par OpenAI · Résultats indicatifs selon la qualité de la photo
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
