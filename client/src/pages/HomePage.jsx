import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import CraftCalculatorWidget from '../components/CraftCalculatorWidget';
import { 
  Search, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  Heart, 
  Award, 
  Compass, 
  BookOpen, 
  UserCheck, 
  CheckCircle2, 
  HelpCircle,
  TrendingUp,
  Layers,
  Volume2,
  Check,
  ChevronRight
} from 'lucide-react';

export default function HomePage() {
  const { 
    artisans, 
    crafts, 
    stats, 
    favorites, 
    toggleFavorite, 
    openInquiryModal,
    compareList,
    toggleCompare
  } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('All');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/artisans?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/artisans');
    }
  };

  // Filter featured artisans based on interactive quick tab
  const filteredFeatured = artisans
    .filter(a => selectedCategoryTab === 'All' || a.craftCategory === selectedCategoryTab)
    .slice(0, 6);

  const categories = [
    { 
      name: 'Textiles & Weaving', 
      count: '8 Masters', 
      icon: '🧵', 
      query: 'Textiles & Weaving',
      gradient: 'from-purple-900 via-indigo-900 to-slate-900',
      border: 'border-purple-400/60',
      accent: 'text-purple-300'
    },
    { 
      name: 'Traditional Painting', 
      count: '6 Masters', 
      icon: '🎨', 
      query: 'Traditional Painting',
      gradient: 'from-rose-900 via-amber-950 to-stone-900',
      border: 'border-rose-400/60',
      accent: 'text-rose-300'
    },
    { 
      name: 'Metalwork & Bronze', 
      count: '4 Masters', 
      icon: '⚔️', 
      query: 'Metalwork',
      gradient: 'from-amber-950 via-yellow-950 to-stone-900',
      border: 'border-amber-400/60',
      accent: 'text-amber-300'
    },
    { 
      name: 'Ceramics & Pottery', 
      count: '2 Masters', 
      icon: '🏺', 
      query: 'Ceramics & Pottery',
      gradient: 'from-cyan-950 via-blue-950 to-slate-900',
      border: 'border-cyan-400/60',
      accent: 'text-cyan-300'
    },
    { 
      name: 'Woodcraft & Lacquer', 
      count: '3 Masters', 
      icon: '🪵', 
      query: 'Woodcraft',
      gradient: 'from-emerald-950 via-teal-950 to-stone-900',
      border: 'border-emerald-400/60',
      accent: 'text-emerald-300'
    },
    { 
      name: 'Embroidery & Applique', 
      count: '2 Masters', 
      icon: '🪡', 
      query: 'Textiles & Embroidery',
      gradient: 'from-pink-950 via-rose-950 to-stone-900',
      border: 'border-pink-400/60',
      accent: 'text-pink-300'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      
      {/* 1. VIBRANT ROYAL JEWEL-TONED HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#3B0764] text-white pt-14 sm:pt-24 pb-20 sm:pb-32 border-b-4 border-amber-500 shadow-2xl">
        {/* Luminous background glow effects */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-amber-500/20 via-rose-500/20 to-indigo-500/0 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-gradient-to-br from-purple-500/20 to-blue-500/0 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            
            {/* National Initiative Golden Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border-2 border-amber-400/40 text-amber-300 text-xs font-bold tracking-wider uppercase shadow-lg backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>National Traditional Craft Directory • 0% Broker Fee</span>
            </div>

            {/* Radiant Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heritage font-extrabold leading-tight tracking-tight">
              Preserving Traditions, <br />
              <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent drop-shadow-md">
                Empowering India's
              </span> Living Masters
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto font-light">
              A centralized digital platform documenting verified traditional artisans, 
              connecting them directly with patrons, researchers, and institutions across 
              28 States and Union Territories with <strong>100% fair artisan value</strong>.
            </p>

            {/* Search Box with Gold Glowing Accent */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto pt-2">
              <div className="relative flex items-center rounded-2xl bg-white/95 backdrop-blur-md border-2 border-amber-400 shadow-2xl p-2 focus-within:ring-4 focus-within:ring-amber-400/30 transition-all">
                <Search className="w-5 h-5 text-amber-600 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by artisan, craft (Rogan, Pashmina, Bidri), state..."
                  className="w-full px-4 py-2.5 text-sm sm:text-base text-gray-900 placeholder-gray-500 bg-transparent focus:outline-none font-medium"
                />
                <button
                  type="submit"
                  className="px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-orange-500 text-white font-bold hover:opacity-95 shadow-lg text-sm shrink-0 transition-opacity flex items-center gap-1.5"
                >
                  <span>Search Directory</span>
                </button>
              </div>

              {/* Colorful Search Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-5 text-xs">
                <span className="font-bold text-amber-300">Popular Crafts:</span>
                {[
                  { name: 'Rogan Art', color: 'bg-amber-500/20 text-amber-200 border-amber-400/40' },
                  { name: 'Kani Pashmina', color: 'bg-indigo-500/20 text-indigo-200 border-indigo-400/40' },
                  { name: 'Madhubani Painting', color: 'bg-rose-500/20 text-rose-200 border-rose-400/40' },
                  { name: 'Bidriware Inlay', color: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40' },
                  { name: 'Channapatna Toys', color: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40' },
                  { name: 'Dokra Casting', color: 'bg-orange-500/20 text-orange-200 border-orange-400/40' }
                ].map((chip) => (
                  <button
                    type="button"
                    key={chip.name}
                    onClick={() => navigate(`/artisans?q=${encodeURIComponent(chip.name)}`)}
                    className={`px-3 py-1 rounded-full border text-xs font-semibold hover:scale-105 transition-all shadow-sm ${chip.color}`}
                  >
                    {chip.name}
                  </button>
                ))}
              </div>
            </form>
          </div>

          {/* KPI Ribbon in Gleaming Jewel Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto">
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-amber-400/30 text-center shadow-lg hover:border-amber-400 transition-colors">
              <div className="text-3xl sm:text-4xl font-heritage font-extrabold text-amber-400">
                {stats.totalArtisans}
              </div>
              <div className="text-xs text-amber-200 font-semibold mt-1">Verified Master Craftspersons</div>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-emerald-400/30 text-center shadow-lg hover:border-emerald-400 transition-colors">
              <div className="text-3xl sm:text-4xl font-heritage font-extrabold text-emerald-400">
                0%
              </div>
              <div className="text-xs text-emerald-200 font-semibold mt-1">Middleman Cut (100% Direct)</div>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-cyan-400/30 text-center shadow-lg hover:border-cyan-400 transition-colors">
              <div className="text-3xl sm:text-4xl font-heritage font-extrabold text-cyan-300">
                {stats.giCraftsCount}
              </div>
              <div className="text-xs text-cyan-200 font-semibold mt-1">Registered GI Crafts Documented</div>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-rose-400/30 text-center shadow-lg hover:border-rose-400 transition-colors">
              <div className="text-3xl sm:text-4xl font-heritage font-extrabold text-rose-300">
                {stats.uniqueStates}
              </div>
              <div className="text-xs text-rose-200 font-semibold mt-1">States & UTs Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM & DIRECT SOLUTION (Zero-Middleman Paradigm) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#1E3A8A] text-white shadow-2xl border-2 border-amber-400/30 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>The Core Disintermediation Mission</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-heritage font-bold leading-snug">
                Eliminating Intermediaries. Restoring Fair Value to Artisans.
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Traditional artisans face systemic barriers: limited digital presence, 
                imitation powerloom products, and heavy dependence on middlemen who pocket 
                over 70% of retail margins while artisans earn subsistence wages.
              </p>
              
              <div className="space-y-2.5 pt-2 text-sm text-gray-200">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Direct phone, WhatsApp & studio address access for every artisan</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Government-verified credentials, Shilp Guru awards, & GI registrations</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Documented techniques, tools, and generational lineages preserved digitally</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  to="/artisans"
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold hover:opacity-90 transition-opacity text-sm shadow-xl inline-flex items-center gap-2"
                >
                  <span>Explore Verified Masters</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/prd"
                  className="px-6 py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors text-sm border border-white/20"
                >
                  Read PRD Documentation
                </Link>
              </div>
            </div>

            {/* Direct Model Comparison Card */}
            <div className="space-y-4">
              {/* Old Middleman Model */}
              <div className="p-5 rounded-2xl bg-black/40 border border-red-400/40 space-y-2">
                <div className="flex items-center justify-between text-xs text-red-300 font-bold uppercase">
                  <span>Traditional Middleman Model</span>
                  <span>Artisan gets ~20%</span>
                </div>
                <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden flex">
                  <div className="bg-red-400 h-full w-[25%]" title="Artisan share"></div>
                  <div className="bg-amber-400 h-full w-[35%]" title="Wholesale middleman"></div>
                  <div className="bg-orange-500 h-full w-[40%]" title="Retail boutique markup"></div>
                </div>
                <p className="text-xs text-gray-300">
                  Heavy broker margins, hidden artisan identities, delayed payments.
                </p>
              </div>

              {/* The Traditional Craft Directory Model */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/80 to-emerald-900/60 border-2 border-emerald-400 space-y-2 shadow-lg">
                <div className="flex items-center justify-between text-xs text-emerald-300 font-bold uppercase">
                  <span>The Traditional Craft Directory Model</span>
                  <span>Artisan gets 100%</span>
                </div>
                <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-400 h-full w-full" title="100% Direct to Artisan"></div>
                </div>
                <p className="text-xs text-emerald-100 font-medium">
                  Direct connection via Phone, WhatsApp & Workshop visits. Zero platform cut.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. VIBRANT JEWEL-TONED CRAFT CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#C85A32] mb-1">
              Disciplines of India
            </div>
            <h2 className="text-2xl sm:text-3xl font-heritage font-bold text-[#1E232A]">
              Explore by Craft Category
            </h2>
          </div>
          <Link
            to="/crafts"
            className="text-xs sm:text-sm font-bold text-[#C85A32] hover:underline flex items-center gap-1"
          >
            Browse Craft Encyclopedia ({crafts.length} disciplines) →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate(`/artisans?category=${encodeURIComponent(cat.query)}`)}
              className={`p-5 rounded-2xl bg-gradient-to-br ${cat.gradient} border-2 ${cat.border} text-white hover:scale-105 hover:shadow-2xl transition-all text-center group flex flex-col items-center justify-center space-y-2`}
            >
              <span className="text-4xl group-hover:scale-125 transition-transform duration-300 drop-shadow">
                {cat.icon}
              </span>
              <h3 className="text-xs sm:text-sm font-bold leading-snug">
                {cat.name}
              </h3>
              <span className={`text-[11px] font-semibold ${cat.accent}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE CRAFT COMMISSION & SAVINGS ESTIMATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CraftCalculatorWidget />
      </section>

      {/* 5. FEATURED MASTER ARTISANS WITH COMPARE CAPABILITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#C85A32] mb-1">
              National Treasures
            </div>
            <h2 className="text-2xl sm:text-3xl font-heritage font-bold text-[#1E232A]">
              Featured Master Craftspersons
            </h2>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {['All', 'Textiles & Weaving', 'Traditional Painting', 'Metalwork', 'Ceramics & Pottery', 'Woodcraft'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryTab(cat)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                  selectedCategoryTab === cat
                    ? 'bg-[#1B365D] text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-amber-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Artisans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatured.map((artisan) => {
            const isFav = favorites.includes(artisan.id);
            const isCompared = compareList.includes(artisan.id);

            return (
              <div
                key={artisan.id}
                className="bg-white rounded-3xl border-2 border-[#E7DFCE] hover:border-amber-400 shadow-md hover:shadow-2xl transition-all overflow-hidden flex flex-col group hover:-translate-y-1"
              >
                {/* Image & Badges */}
                <div className="relative h-52 overflow-hidden bg-gray-900">
                  <img
                    src={artisan.coverImage}
                    alt={artisan.craftSubtype}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleFavorite(artisan.id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 text-gray-600 hover:text-rose-600 flex items-center justify-center shadow transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'text-rose-600 fill-current' : ''}`} />
                  </button>

                  {/* GI Tag Badge */}
                  {artisan.giTag && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-blue-900/90 text-blue-100 text-[10px] font-bold tracking-wide border border-blue-400/50 shadow">
                      GI Tag: {artisan.giTag.number}
                    </div>
                  )}

                  {/* Artisan Mini Avatar & Location */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
                    <img
                      src={artisan.profileImage}
                      alt={artisan.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400 shadow-xl shrink-0"
                    />
                    <div className="text-white min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-heritage font-bold text-base truncate">
                          {artisan.name}
                        </h3>
                        <span title="Government Verified Master">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        </span>
                      </div>
                      <p className="text-xs text-amber-200 truncate flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        {artisan.village}, {artisan.state}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#C85A32] text-sm">
                        {artisan.craftSubtype}
                      </span>
                      <span className="text-gray-600 font-semibold text-[11px] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {artisan.experienceYears} Yrs Mastery
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {artisan.bio}
                    </p>

                    {/* Awards ribbon */}
                    {artisan.awards?.length > 0 && (
                      <div className="flex items-center gap-1.5 pt-1 text-xs text-[#1B365D] font-bold">
                        <Award className="w-4 h-4 text-amber-500 shrink-0" />
                        <span className="truncate">{artisan.awards[0].name} ({artisan.awards[0].year})</span>
                      </div>
                    )}
                  </div>

                  {/* Interactive Compare Toggle & Direct Connect */}
                  <div className="pt-3 border-t border-gray-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      {/* Compare Checkbox */}
                      <button
                        onClick={() => toggleCompare(artisan.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                          isCompared 
                            ? 'bg-amber-100 text-amber-900 border-amber-400 font-bold'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-amber-400'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] border ${
                          isCompared ? 'bg-amber-500 text-white border-amber-600' : 'border-gray-400'
                        }`}>
                          {isCompared && '✓'}
                        </span>
                        <span>{isCompared ? 'Compared' : 'Compare'}</span>
                      </button>

                      <Link
                        to={`/artisans/${artisan.id}`}
                        className="font-bold text-[#1B365D] hover:text-[#C85A32] transition-colors"
                      >
                        View Dossier →
                      </Link>
                    </div>

                    <button
                      onClick={() => openInquiryModal(artisan)}
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#B33925] text-white hover:opacity-90 font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Direct Connect (0% Broker Fee)</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. REGIONAL CRAFT ATLAS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1E1B4B] via-[#0F172A] to-[#1E3A8A] text-white shadow-2xl border-2 border-amber-400/40 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Geographical Heritage
              </span>
              <h2 className="text-2xl sm:text-3xl font-heritage font-bold">
                India's Living Craft Geography
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
                Every district in India holds centuries of indigenous material knowledge. 
                Explore crafts by state, cluster, and cultural hubs.
              </p>
            </div>
            <Link
              to="/atlas"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs sm:text-sm font-bold hover:opacity-90 transition-opacity inline-flex items-center gap-2 shadow-xl"
            >
              <Compass className="w-4 h-4 text-white" />
              <span>Open Regional Atlas</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
            {[
              { state: 'Gujarat', hub: 'Kutch / Patan', tag: 'Rogan, Ajrakh, Patola', color: 'border-amber-400/50' },
              { state: 'Jammu & Kashmir', hub: 'Kanihama / Srinagar', tag: 'Kani Shawls, Walnut', color: 'border-indigo-400/50' },
              { state: 'Bihar', hub: 'Madhubani / Ranti', tag: 'Mithila Painting', color: 'border-rose-400/50' },
              { state: 'Karnataka', hub: 'Bidar / Channapatna', tag: 'Bidriware, Wood Toys', color: 'border-cyan-400/50' },
              { state: 'Odisha', hub: 'Raghurajpur / Puri', tag: 'Pattachitra, Applique', color: 'border-emerald-400/50' },
              { state: 'Rajasthan', hub: 'Jaipur / Molela', tag: 'Blue Pottery, Terracotta', color: 'border-yellow-400/50' }
            ].map((item) => (
              <Link
                key={item.state}
                to={`/artisans?state=${encodeURIComponent(item.state)}`}
                className={`p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border-2 ${item.color} hover:scale-105 transition-all group backdrop-blur-sm`}
              >
                <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.state}
                </div>
                <div className="text-[11px] text-amber-300 font-semibold mt-0.5">
                  {item.hub}
                </div>
                <div className="text-[10px] text-gray-300 truncate mt-1">
                  {item.tag}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION: FIELD ONBOARDING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#B91C1C] via-[#C85A32] to-[#B45309] text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-amber-400/50">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-heritage font-bold">
              Know an Unsung Master Artisan?
            </h3>
            <p className="text-sm text-amber-100 max-w-xl">
              Help us bridge the digital divide. Field officers, community members, and NGO workers 
              can nominate traditional craftspersons for verification and free listing.
            </p>
          </div>
          <Link
            to="/onboard"
            className="px-8 py-3.5 rounded-xl bg-white text-[#B91C1C] font-bold hover:bg-amber-50 shadow-xl transition-all text-sm shrink-0 flex items-center gap-2"
          >
            <UserCheck className="w-5 h-5 text-[#B91C1C]" />
            <span>Nominate an Artisan</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
