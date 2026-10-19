import React from 'react';
import { useData } from '../context/DataContext';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Award, 
  Phone, 
  MessageCircle, 
  Sparkles, 
  Layers, 
  Trash2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ArtisanCompareModal() {
  const { 
    artisans, 
    compareList, 
    isCompareModalOpen, 
    closeCompareModal, 
    openCompareModal, 
    toggleCompare, 
    clearCompare,
    openInquiryModal 
  } = useData();

  if (compareList.length === 0) return null;

  const comparedArtisans = artisans.filter(a => compareList.includes(a.id));

  return (
    <>
      {/* 1. FLOATING COMPARISON DOCK AT BOTTOM */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#311042] text-white px-5 py-3 rounded-2xl shadow-2xl border-2 border-amber-400/60 flex items-center gap-4 animate-slideUp backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center font-bold text-xs shadow-md">
            {compareList.length}
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wide">
              Compare Master Artisans
            </div>
            <div className="text-[11px] text-gray-300">
              {compareList.length} of 3 masters selected
            </div>
          </div>
        </div>

        {/* Small Avatars Preview */}
        <div className="flex items-center -space-x-2">
          {comparedArtisans.map((a) => (
            <img
              key={a.id}
              src={a.profileImage}
              alt={a.name}
              title={a.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-amber-400 shadow"
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={openCompareModal}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-orange-500 hover:opacity-90 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Compare Now</span>
          </button>
          
          <button
            onClick={clearCompare}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. SIDE-BY-SIDE INTERACTIVE COMPARISON MODAL */}
      {isCompareModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn"
          onClick={closeCompareModal}
        >
          <div 
            className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border-2 border-amber-400/50 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#1E3A8A] text-white flex items-center justify-between sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heritage text-lg sm:text-xl font-bold">
                    Master Artisan Side-by-Side Comparison
                  </h3>
                  <p className="text-xs text-gray-300">
                    Comparing technique lineages, GI authorizations, experience, and direct commission terms
                  </p>
                </div>
              </div>

              <button
                onClick={closeCompareModal}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Grid Table */}
            <div className="p-6 overflow-x-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-[700px]">
                {comparedArtisans.map((artisan) => (
                  <div 
                    key={artisan.id} 
                    className="p-5 rounded-2xl bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 border-2 border-[#E7DFCE] hover:border-amber-400 transition-all space-y-4 shadow-sm"
                  >
                    {/* Header Photo & Identity */}
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                      <img
                        src={artisan.profileImage}
                        alt={artisan.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-heritage font-bold text-base text-[#1E232A] truncate">
                          {artisan.name}
                        </h4>
                        <p className="text-xs font-semibold text-[#C85A32] truncate">
                          {artisan.craftSubtype}
                        </p>
                        <p className="text-[11px] text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-500" />
                          {artisan.village}, {artisan.state}
                        </p>
                      </div>
                    </div>

                    {/* Comparison Fields */}
                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="text-gray-400 font-semibold uppercase text-[10px] block">
                          Generational Experience
                        </span>
                        <span className="text-base font-bold text-[#1E232A]">
                          {artisan.experienceYears} Years
                        </span>
                      </div>

                      <div>
                        <span className="text-gray-400 font-semibold uppercase text-[10px] block">
                          GI-Tag Certification
                        </span>
                        <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-bold text-[11px] border border-blue-200 mt-0.5">
                          {artisan.giTag?.title || 'Registered Heritage'} ({artisan.giTag?.number || 'GI Tag'})
                        </span>
                      </div>

                      <div>
                        <span className="text-gray-400 font-semibold uppercase text-[10px] block">
                          Highest Recognition
                        </span>
                        <span className="font-bold text-amber-700 flex items-center gap-1 mt-0.5">
                          <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          {artisan.awards?.[0]?.name} ({artisan.awards?.[0]?.year})
                        </span>
                      </div>

                      <div>
                        <span className="text-gray-400 font-semibold uppercase text-[10px] block">
                          Indigenous Materials
                        </span>
                        <p className="text-gray-700 font-medium line-clamp-2 mt-0.5">
                          {artisan.materials?.join(', ')}
                        </p>
                      </div>

                      <div>
                        <span className="text-gray-400 font-semibold uppercase text-[10px] block">
                          Commission Price Range
                        </span>
                        <span className="text-sm font-bold text-emerald-700">
                          {artisan.priceRange}
                        </span>
                      </div>

                      <div>
                        <span className="text-gray-400 font-semibold uppercase text-[10px] block">
                          Direct Contact
                        </span>
                        <span className="font-semibold text-gray-800">
                          {artisan.contact?.phone}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-gray-200 flex flex-col gap-2">
                      <button
                        onClick={() => {
                          closeCompareModal();
                          openInquiryModal(artisan);
                        }}
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#B33925] text-white text-xs font-bold hover:opacity-90 shadow-sm transition-all"
                      >
                        Direct Inquiry (0% Fee)
                      </button>

                      <Link
                        to={`/artisans/${artisan.id}`}
                        onClick={closeCompareModal}
                        className="w-full py-2 text-center rounded-xl bg-white border border-gray-300 text-gray-700 text-xs font-semibold hover:border-amber-500 transition-colors"
                      >
                        View Full Dossier →
                      </Link>

                      <button
                        onClick={() => toggleCompare(artisan.id)}
                        className="text-[11px] text-gray-400 hover:text-red-600 transition-colors pt-1"
                      >
                        Remove from comparison
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
