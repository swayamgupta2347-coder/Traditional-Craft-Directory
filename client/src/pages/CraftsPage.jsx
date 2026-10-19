import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  Wrench, 
  AlertTriangle,
  Compass,
  CheckCircle2
} from 'lucide-react';

export default function CraftsPage() {
  const { crafts, artisans } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCraftModal, setActiveCraftModal] = useState(null);
  const navigate = useNavigate();

  const categories = useMemo(() => {
    const set = new Set(crafts.map(c => c.category));
    return ['All', ...Array.from(set)];
  }, [crafts]);

  const filteredCrafts = useMemo(() => {
    return crafts.filter(c => {
      if (selectedCategory !== 'All' && c.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          c.name.toLowerCase().includes(q) ||
          c.originState.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.giStatus.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [crafts, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Page Header */}
      <div className="border-b border-[#E7DFCE] pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
          <BookOpen className="w-4 h-4" />
          <span>Living Heritage Encyclopedia</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heritage font-bold text-[#1E232A]">
          Traditional Crafts of India
        </h1>
        <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
          Comprehensive digital documentation of India's classical, tribal, and folk craft disciplines. 
          Documenting generational techniques, historical roots, tools, and Geographical Indication protections.
        </p>
      </div>

      {/* Search & Category Filter Ribbon */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search craft, state, or technique..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#C85A32] focus:border-[#C85A32] bg-white shadow-2xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#C85A32] text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Crafts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrafts.map((craft) => {
          // Count practicing artisans in our directory
          const practicingArtisans = artisans.filter(a =>
            a.craftSubtype.toLowerCase().includes(craft.name.toLowerCase().split(' ')[0]) ||
            craft.name.toLowerCase().includes(a.craftSubtype.toLowerCase().split(' ')[0])
          );

          const isCritical = craft.endangeredStatus?.toLowerCase().includes('critical') || craft.endangeredStatus?.toLowerCase().includes('endangered');

          return (
            <div
              key={craft.id}
              className="bg-white rounded-3xl border border-[#E7DFCE] shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between group"
            >
              {/* Image & Header */}
              <div>
                <div className="relative h-48 overflow-hidden bg-gray-900">
                  <img
                    src={craft.heroImage}
                    alt={craft.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>

                  {/* GI Status Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#1B365D]/90 text-white text-[11px] font-semibold backdrop-blur-sm border border-white/20">
                    {craft.giStatus}
                  </div>

                  {/* State Tag */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#F3A628]">
                      {craft.category}
                    </span>
                    <h3 className="text-lg font-heritage font-bold">
                      {craft.name}
                    </h3>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1 font-medium text-gray-700">
                      <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                      {craft.originState}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {craft.historicalEra}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {craft.description}
                  </p>

                  {/* Endangered Status Indicator */}
                  <div className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                    isCritical 
                      ? 'bg-amber-50 text-amber-900 border border-amber-200' 
                      : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  }`}>
                    {isCritical ? (
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    <span className="text-[11px] font-medium truncate">
                      {craft.endangeredStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 pt-0 border-t border-[#F2ECE1] mt-2 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveCraftModal(craft)}
                  className="text-xs font-semibold text-[#1B365D] hover:text-[#C85A32] transition-colors"
                >
                  Read Historical Dossier →
                </button>

                <Link
                  to={`/artisans?q=${encodeURIComponent(craft.name.split(' ')[0])}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF6EF] text-[#C85A32] hover:bg-[#C85A32] hover:text-white border border-[#C85A32]/30 text-xs font-semibold transition-colors"
                >
                  <span>{practicingArtisans.length} Masters</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Craft Deep-Dive Modal */}
      {activeCraftModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActiveCraftModal(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-[#E7DFCE]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative h-56 bg-gray-900">
              <img
                src={activeCraftModal.heroImage}
                alt={activeCraftModal.name}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              <button
                onClick={() => setActiveCraftModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 text-gray-600 hover:text-gray-900 flex items-center justify-center font-bold"
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="text-xs text-[#F3A628] font-bold uppercase tracking-wider">
                  {activeCraftModal.giStatus}
                </div>
                <h2 className="text-2xl sm:text-3xl font-heritage font-bold">
                  {activeCraftModal.name}
                </h2>
                <p className="text-xs text-gray-200">
                  Origin: {activeCraftModal.originState} • Era: {activeCraftModal.historicalEra}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#C85A32]">
                  Overview & Craft Technique
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {activeCraftModal.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B365D]">
                  Cultural & Historical Significance
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed bg-[#FAF6EF] p-4 rounded-xl border border-[#E7DFCE]">
                  {activeCraftModal.culturalSignificance}
                </p>
              </div>

              {/* Tools & Key Centres */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span>Traditional Tools Used</span>
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {activeCraftModal.tools?.map((tool, i) => (
                      <li key={i}>• {tool}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span>Key Heritage Craft Centres</span>
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {activeCraftModal.keyCentres?.map((centre, i) => (
                      <li key={i}>• {centre}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveCraftModal(null)}
                  className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    setActiveCraftModal(null);
                    navigate(`/artisans?q=${encodeURIComponent(activeCraftModal.name.split(' ')[0])}`);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#C85A32] text-white text-xs font-semibold hover:bg-[#B33925] shadow-sm flex items-center gap-2"
                >
                  <span>Explore Master Artisans for {activeCraftModal.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
