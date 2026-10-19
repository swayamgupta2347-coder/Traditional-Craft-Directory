import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
  Search, 
  Filter, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Heart, 
  MessageCircle, 
  Grid, 
  List, 
  X, 
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  Phone,
  Layers
} from 'lucide-react';

export default function ArtisansPage() {
  const { 
    artisans, 
    favorites, 
    toggleFavorite, 
    openInquiryModal,
    compareList,
    toggleCompare,
    openCompareModal
  } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search and Filter State synced with URL query params
  const initialQuery = searchParams.get('q') || '';
  const initialState = searchParams.get('state') || 'All';
  const initialCategory = searchParams.get('category') || 'All';
  const initialGiOnly = searchParams.get('giOnly') === 'true';
  const initialVerifiedOnly = searchParams.get('verifiedOnly') === 'true';

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedState, setSelectedState] = useState(initialState);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [giOnly, setGiOnly] = useState(initialGiOnly);
  const [verifiedOnly, setVerifiedOnly] = useState(initialVerifiedOnly);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract unique states and categories from dataset
  const uniqueStates = useMemo(() => {
    const set = new Set(artisans.map(a => a.state));
    return ['All', ...Array.from(set).sort()];
  }, [artisans]);

  const uniqueCategories = useMemo(() => {
    const set = new Set(artisans.map(a => a.craftCategory));
    return ['All', ...Array.from(set).sort()];
  }, [artisans]);

  // Filter & Sort Logic
  const filteredArtisans = useMemo(() => {
    return artisans.filter(a => {
      // Text search
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const matchesName = a.name.toLowerCase().includes(q);
        const matchesCraft = a.craftSubtype.toLowerCase().includes(q) || a.craftCategory.toLowerCase().includes(q);
        const matchesLocation = a.state.toLowerCase().includes(q) || a.district.toLowerCase().includes(q) || a.village.toLowerCase().includes(q);
        const matchesBio = a.bio?.toLowerCase().includes(q);
        if (!matchesName && !matchesCraft && !matchesLocation && !matchesBio) return false;
      }

      // State filter
      if (selectedState !== 'All' && a.state.toLowerCase() !== selectedState.toLowerCase()) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && a.craftCategory.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // GI Tag filter
      if (giOnly && (!a.giTag || a.giTag.status !== 'Registered')) {
        return false;
      }

      // Verified status filter
      if (verifiedOnly && a.verificationStatus !== 'Verified') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'experience-desc') {
        return b.experienceYears - a.experienceYears;
      }
      if (sortBy === 'views-desc') {
        return (b.viewCount || 0) - (a.viewCount || 0);
      }
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      // Default: verified first, then views
      if (a.verificationStatus === 'Verified' && b.verificationStatus !== 'Verified') return -1;
      if (a.verificationStatus !== 'Verified' && b.verificationStatus === 'Verified') return 1;
      return (b.viewCount || 0) - (a.viewCount || 0);
    });
  }, [artisans, searchTerm, selectedState, selectedCategory, giOnly, verifiedOnly, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedState('All');
    setSelectedCategory('All');
    setGiOnly(false);
    setVerifiedOnly(false);
    setSortBy('relevance');
    setSearchParams({});
  };

  const hasActiveFilters = searchTerm || selectedState !== 'All' || selectedCategory !== 'All' || giOnly || verifiedOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header Banner */}
      <div className="border-b border-[#E7DFCE] pb-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Artisan Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heritage font-bold text-[#1E232A] mt-1">
            India's Master Craftspersons
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-xl">
            Explore verified traditional artisans across India. Connect directly via Phone, 
            WhatsApp, or book workshop visits with 0% middleman fees.
          </p>
        </div>

        {/* View Toggle & Count */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-gray-500 font-medium">
            Showing <strong>{filteredArtisans.length}</strong> of {artisans.length} artisans
          </span>

          <div className="flex items-center bg-white border border-[#E7DFCE] rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'grid' ? 'bg-[#C85A32] text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'list' ? 'bg-[#C85A32] text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF6EF] border border-[#E7DFCE] text-xs font-medium text-[#1E232A]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#C85A32]" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Quick Interactive Category Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 shrink-0">Craft Focus:</span>
        {[
          { name: 'All' },
          { name: 'Textiles & Weaving' },
          { name: 'Pottery & Terracotta' },
          { name: 'Metalcraft & Dhokra' },
          { name: 'Painting & Folk Art' },
          { name: 'Woodcraft & Inlay' },
          { name: 'Jewelry & Filigree' }
        ].map((item) => {
          const isSelected = selectedCategory === item.name;
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => setSelectedCategory(item.name)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white border-amber-300 shadow-md font-semibold scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-amber-400 hover:text-amber-800'
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      {/* Dynamic Active Compare Banner */}
      {compareList.length > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-rose-950 text-white border border-amber-400/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-300">
                Artisan Comparison Dock ({compareList.length} of 3 masters queued)
              </p>
              <p className="text-xs text-slate-300">
                Side-by-side analysis of experience, awards, GI certification, and direct contact options.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={openCompareModal}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-bold hover:brightness-110 shadow-md transition-transform active:scale-95 shrink-0"
          >
            Launch Comparison Matrix →
          </button>
        </div>
      )}

      {/* Main Layout: Filters Sidebar + Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Filters Sidebar (Desktop) */}
        <div className={`md:block ${mobileFilterOpen ? 'block' : 'hidden'} space-y-6 md:col-span-1`}>
          <div className="p-5 rounded-2xl bg-white border border-[#E7DFCE] shadow-sm space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE1]">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#C85A32]" />
                <h2 className="font-heritage text-sm font-bold text-[#1E232A]">Filter Directory</h2>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-semibold text-[#C85A32] hover:underline"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">Search Keyword</label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Name, craft, village..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#C85A32] focus:border-[#C85A32]"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* State Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">State / Region</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#C85A32] focus:border-[#C85A32]"
              >
                {uniqueStates.map(state => (
                  <option key={state} value={state}>{state === 'All' ? 'All States (Pan-India)' : state}</option>
                ))}
              </select>
            </div>

            {/* Craft Category Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">Craft Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#C85A32] focus:border-[#C85A32]"
              >
                {uniqueCategories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'All' ? 'All Craft Disciplines' : cat}</option>
                ))}
              </select>
            </div>

            {/* Verification & GI Toggles */}
            <div className="space-y-3 pt-2 border-t border-[#F2ECE1]">
              <label className="text-xs font-semibold text-gray-700 block">Authenticity Badges</label>

              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-gray-700 select-none">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded text-[#C85A32] focus:ring-[#C85A32] h-4 w-4"
                />
                <span className="flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Masters Only
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-gray-700 select-none">
                <input
                  type="checkbox"
                  checked={giOnly}
                  onChange={(e) => setGiOnly(e.target.checked)}
                  className="rounded text-[#C85A32] focus:ring-[#C85A32] h-4 w-4"
                />
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#1B365D]"></span>
                  Registered GI-Tags Only
                </span>
              </label>
            </div>

            {/* Sort Order */}
            <div className="space-y-1.5 pt-2 border-t border-[#F2ECE1]">
              <label className="text-xs font-semibold text-gray-700">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#C85A32] focus:border-[#C85A32]"
              >
                <option value="relevance">Relevance & Verified First</option>
                <option value="experience-desc">Experience (Highest First)</option>
                <option value="views-desc">Most Visited Profiles</option>
                <option value="name-asc">Artisan Name (A-Z)</option>
              </select>
            </div>

            {/* Direct Connect Assurance */}
            <div className="p-3 rounded-xl bg-[#FAF6EF] border border-[#E7DFCE] text-[11px] text-gray-600 space-y-1">
              <div className="font-semibold text-[#1E232A]">Direct Artisan Connection</div>
              <p>Every profile displays direct phone, WhatsApp & studio address with zero broker fees.</p>
            </div>
          </div>
        </div>

        {/* Listings Content */}
        <div className="md:col-span-3 space-y-6">
          
          {/* Active Filter Chips Bar */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 p-3 bg-white rounded-xl border border-[#E7DFCE] text-xs">
              <span className="text-gray-500 font-medium">Active filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF6EF] text-[#C85A32] border border-[#C85A32]/30">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedState !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF6EF] text-[#C85A32] border border-[#C85A32]/30">
                  State: {selectedState}
                  <button onClick={() => setSelectedState('All')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF6EF] text-[#C85A32] border border-[#C85A32]/30">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {giOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  GI-Tagged
                  <button onClick={() => setGiOnly(false)}><X className="w-3 h-3" /></button>
                </span>
              )}
              {verifiedOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Verified Only
                  <button onClick={() => setVerifiedOnly(false)}><X className="w-3 h-3" /></button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-gray-500 hover:text-gray-800 underline ml-auto"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Empty State */}
          {filteredArtisans.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#E7DFCE] space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF6EF] text-[#C85A32] flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-heritage font-bold text-[#1E232A]">
                No Master Artisans Found
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
                We couldn't find any artisan matching your specific combination of filters. 
                Try resetting filters or searching with a broader term.
              </p>
              <button
                onClick={clearFilters}
                className="px-5 py-2 rounded-xl bg-[#C85A32] text-white text-xs font-semibold hover:bg-[#B33925] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            // GRID VIEW
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArtisans.map((artisan) => {
                const isFav = favorites.includes(artisan.id);
                const isCompared = compareList.includes(artisan.id);
                const award = artisan.awards?.[0];
                const isPadma = award?.name?.toLowerCase().includes('padma');
                const isGuru = award?.name?.toLowerCase().includes('shilp guru');

                return (
                  <div
                    key={artisan.id}
                    className="bg-white rounded-2xl border border-amber-200/60 shadow-sm hover:shadow-xl hover:border-amber-400/80 transition-all duration-300 overflow-hidden flex flex-col group"
                  >
                    {/* Header Image */}
                    <div className="relative h-48 overflow-hidden bg-slate-900">
                      <img
                        src={artisan.coverImage}
                        alt={artisan.craftSubtype}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                      {/* Top Badges & Controls */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-10">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {artisan.verificationStatus === 'Verified' && (
                            <div className="px-2 py-0.5 rounded-full bg-emerald-700/90 text-white text-[10px] font-semibold flex items-center gap-1 backdrop-blur-sm shadow">
                              <ShieldCheck className="w-3 h-3 text-emerald-300" />
                              <span>Verified Master</span>
                            </div>
                          )}
                          {artisan.giTag && (
                            <span className="px-2 py-0.5 rounded-full bg-indigo-900/90 text-indigo-200 text-[10px] font-semibold border border-indigo-400/40 backdrop-blur-sm shadow">
                              GI #{artisan.giTag.number}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* Compare Toggle */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleCompare(artisan.id);
                            }}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 backdrop-blur-md shadow transition-all ${
                              isCompared
                                ? 'bg-amber-400 text-slate-950 border border-amber-300 shadow-amber-500/30'
                                : 'bg-black/50 text-white hover:bg-black/80 border border-white/20'
                            }`}
                            title={isCompared ? 'Remove from Compare' : 'Add to Compare matrix'}
                          >
                            <Layers className="w-3 h-3 text-amber-300" />
                            <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                          </button>

                          {/* Favorite Button */}
                          <button
                            type="button"
                            onClick={() => toggleFavorite(artisan.id)}
                            className="w-7 h-7 rounded-lg bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow transition-colors"
                          >
                            <Heart className={`w-3.5 h-3.5 ${isFav ? 'text-rose-500 fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Mini Avatar & Identity */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
                        <img
                          src={artisan.profileImage}
                          alt={artisan.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-amber-300 shadow-lg shrink-0"
                        />
                        <div className="min-w-0 text-white">
                          <h3 className="font-heritage font-bold text-base truncate drop-shadow-sm">
                            {artisan.name}
                          </h3>
                          <p className="text-[11px] text-amber-200 truncate flex items-center gap-1 font-medium">
                            <MapPin className="w-3 h-3 text-amber-400" />
                            {artisan.village}, {artisan.state}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-gradient-to-b from-white to-[#FAF6EF]">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#C85A32] tracking-wide">
                            {artisan.craftSubtype}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200">
                            {artisan.experienceYears}+ yrs master
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {artisan.bio}
                        </p>

                        {/* Rich Awards Badge */}
                        {award && (
                          <div className="pt-1">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border ${
                              isPadma 
                                ? 'bg-rose-50 text-rose-900 border-rose-300' 
                                : isGuru 
                                ? 'bg-amber-50 text-amber-950 border-amber-300' 
                                : 'bg-indigo-50 text-indigo-950 border-indigo-200'
                            }`}>
                              <Award className={`w-3.5 h-3.5 shrink-0 ${isPadma ? 'text-rose-600' : isGuru ? 'text-amber-600' : 'text-indigo-600'}`} />
                              <span className="truncate">{award.name} ({award.year})</span>
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Direct Actions */}
                      <div className="pt-3 border-t border-amber-100 flex items-center justify-between gap-2">
                        <Link
                          to={`/artisans/${artisan.id}`}
                          className="text-xs font-bold text-[#1B365D] hover:text-[#C85A32] transition-colors"
                        >
                          Full Dossier →
                        </Link>

                        <button
                          type="button"
                          onClick={() => openInquiryModal(artisan)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#B33925] text-white hover:brightness-110 text-xs font-semibold shadow-xs transition-transform active:scale-95"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Direct Connect</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // LIST VIEW
            <div className="space-y-4">
              {filteredArtisans.map((artisan) => {
                const isFav = favorites.includes(artisan.id);
                const isCompared = compareList.includes(artisan.id);
                const award = artisan.awards?.[0];
                const isPadma = award?.name?.toLowerCase().includes('padma');
                const isGuru = award?.name?.toLowerCase().includes('shilp guru');

                return (
                  <div
                    key={artisan.id}
                    className="p-4 bg-white rounded-2xl border border-amber-200/60 shadow-sm hover:shadow-md hover:border-amber-400/70 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4 group"
                  >
                    <img
                      src={artisan.profileImage}
                      alt={artisan.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-amber-300 shadow-sm shrink-0"
                    />

                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          to={`/artisans/${artisan.id}`}
                          className="font-heritage font-bold text-base text-[#1E232A] hover:text-[#C85A32]"
                        >
                          {artisan.name}
                        </Link>
                        {artisan.verificationStatus === 'Verified' && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-300">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            Verified Master
                          </span>
                        )}
                        {artisan.giTag && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-semibold border border-blue-200">
                            GI #{artisan.giTag.number}
                          </span>
                        )}
                        {award && (
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                            isPadma ? 'bg-rose-50 text-rose-800 border-rose-300' : isGuru ? 'bg-amber-50 text-amber-900 border-amber-300' : 'bg-indigo-50 text-indigo-800 border-indigo-200'
                          }`}>
                            {award.name}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-gray-500 flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[#C85A32]">{artisan.craftSubtype}</span>
                        <span>•</span>
                        <span>{artisan.village}, {artisan.state}</span>
                        <span>•</span>
                        <span>{artisan.experienceYears} Years Exp</span>
                      </p>

                      <p className="text-xs text-gray-600 line-clamp-1 max-w-2xl">
                        {artisan.bio}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleCompare(artisan.id);
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1 transition-all ${
                          isCompared
                            ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                        }`}
                        title={isCompared ? 'Remove from Compare' : 'Add to Compare matrix'}
                      >
                        <Layers className="w-3.5 h-3.5 text-amber-600" />
                        <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleFavorite(artisan.id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-[#C85A32] hover:bg-[#FAF6EF]"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'text-[#C85A32] fill-current' : ''}`} />
                      </button>

                      <Link
                        to={`/artisans/${artisan.id}`}
                        className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:border-[#C85A32] hover:text-[#C85A32]"
                      >
                        Profile
                      </Link>

                      <button
                        type="button"
                        onClick={() => openInquiryModal(artisan)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#C85A32] to-[#B33925] text-white text-xs font-semibold hover:brightness-110 shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Connect</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
