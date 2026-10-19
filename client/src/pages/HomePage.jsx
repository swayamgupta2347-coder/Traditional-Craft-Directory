import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
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
  Layers
} from 'lucide-react';

export default function HomePage() {
  const { artisans, crafts, stats, favorites, toggleFavorite, openInquiryModal } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/artisans?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/artisans');
    }
  };

  // Featured 4-6 master craftspersons with high awards
  const featuredArtisans = artisans.slice(0, 6);

  const categories = [
    { name: 'Textiles & Weaving', count: '8 Masters', icon: '🧵', query: 'Textiles & Weaving' },
    { name: 'Traditional Painting', count: '6 Masters', icon: '🎨', query: 'Traditional Painting' },
    { name: 'Metalwork & Bronze', count: '4 Masters', icon: '⚔️', query: 'Metalwork' },
    { name: 'Ceramics & Pottery', count: '2 Masters', icon: '🏺', query: 'Ceramics & Pottery' },
    { name: 'Woodcraft & Lacquer', count: '3 Masters', icon: '🪵', query: 'Woodcraft' },
    { name: 'Embroidery & Applique', count: '2 Masters', icon: '🪡', query: 'Textiles & Embroidery' }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF6EF] via-white to-[#FAF6EF] pt-12 sm:pt-20 pb-20 sm:pb-28 border-b border-[#E7DFCE]">
        {/* Subtle background motif */}
        <div className="absolute inset-0 opacity-[0.03] bg-heritage-pattern pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            
            {/* National Initiative Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C85A32]/10 border border-[#C85A32]/25 text-[#C85A32] text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>National Heritage Artisan Directory • Zero Middlemen</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heritage font-bold text-[#1E232A] leading-tight tracking-tight">
              Preserving Traditions, <br />
              <span className="text-[#C85A32] underline decoration-[#F3A628] decoration-wavy decoration-2">
                Empowering India's
              </span> Living Masters
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              A centralized digital platform documenting verified traditional artisans, 
              connecting them directly with patrons, researchers, and institutions across India.
            </p>

            {/* Search Input Box */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto pt-2">
              <div className="relative flex items-center shadow-lg rounded-2xl bg-white border-2 border-[#E7DFCE] focus-within:border-[#C85A32] transition-colors p-2">
                <Search className="w-5 h-5 text-gray-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by artisan name, craft (Rogan, Pashmina, Bidri), state..."
                  className="w-full px-4 py-2.5 text-sm sm:text-base text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 sm:px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#B33925] text-white font-medium hover:opacity-95 shadow-md text-sm shrink-0 transition-opacity"
                >
                  Explore Directory
                </button>
              </div>

              {/* Quick Search Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                <span className="font-medium text-gray-700">Popular:</span>
                {['Rogan Art', 'Kani Pashmina', 'Madhubani', 'Bidriware', 'Channapatna Toys', 'Dokra'].map((chip) => (
                  <button
                    type="button"
                    key={chip}
                    onClick={() => navigate(`/artisans?q=${encodeURIComponent(chip)}`)}
                    className="px-2.5 py-1 rounded-full bg-white border border-[#E7DFCE] text-gray-700 hover:border-[#C85A32] hover:text-[#C85A32] transition-colors shadow-2xs"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </form>
          </div>

          {/* KPI Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto">
            <div className="p-4 rounded-xl bg-white border border-[#E7DFCE] shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-heritage font-bold text-[#C85A32]">
                {stats.totalArtisans}
              </div>
              <div className="text-xs text-gray-500 font-medium mt-1">Verified Master Craftspersons</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E7DFCE] shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-heritage font-bold text-[#1B365D]">
                0%
              </div>
              <div className="text-xs text-gray-500 font-medium mt-1">Middleman Cut (100% Direct)</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E7DFCE] shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-heritage font-bold text-[#F3A628]">
                {stats.giCraftsCount}
              </div>
              <div className="text-xs text-gray-500 font-medium mt-1">Registered GI Crafts Documented</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E7DFCE] shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-heritage font-bold text-emerald-600">
                {stats.uniqueStates}
              </div>
              <div className="text-xs text-gray-500 font-medium mt-1">States & UTs Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM & DIRECT SOLUTION (Zero-Middleman Paradigm) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#1B365D] text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-[#F3A628] text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>The Core Mission</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-heritage font-bold leading-snug">
                Cutting the Intermediaries. Restoring Fair Value to Artisans.
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Traditional artisans face immense vulnerability: limited digital presence, 
                imitation powerloom products, and heavy dependence on middlemen who pocket 
                over 70% of retail margins.
              </p>
              <div className="space-y-2.5 pt-2 text-sm text-gray-200">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct phone, WhatsApp & studio address access for every artisan</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Government-verified credentials, Shilp Guru awards, & GI registrations</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Documented techniques, tools, and generational lineages preserved digitally</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  to="/artisans"
                  className="px-6 py-2.5 rounded-xl bg-[#C85A32] text-white font-medium hover:bg-[#B33925] transition-colors text-sm shadow-md inline-flex items-center gap-2"
                >
                  <span>Explore Verified Masters</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/prd"
                  className="px-6 py-2.5 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors text-sm border border-white/20"
                >
                  Read PRD Documentation
                </Link>
              </div>
            </div>

            {/* Direct Model Comparison Card */}
            <div className="space-y-4">
              {/* Old Middleman Model */}
              <div className="p-5 rounded-2xl bg-white/10 border border-red-400/30 space-y-2">
                <div className="flex items-center justify-between text-xs text-red-300 font-semibold uppercase">
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
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-900/60 to-emerald-800/40 border border-emerald-400/50 space-y-2">
                <div className="flex items-center justify-between text-xs text-emerald-300 font-semibold uppercase">
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

      {/* 3. CRAFT CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C85A32] mb-1">
              Disciplines of India
            </div>
            <h2 className="text-2xl sm:text-3xl font-heritage font-bold text-[#1E232A]">
              Explore by Craft Category
            </h2>
          </div>
          <Link
            to="/crafts"
            className="text-xs sm:text-sm font-semibold text-[#C85A32] hover:underline flex items-center gap-1"
          >
            Browse Craft Encyclopedia ({crafts.length} disciplines) →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate(`/artisans?category=${encodeURIComponent(cat.query)}`)}
              className="p-5 rounded-2xl bg-white border border-[#E7DFCE] hover:border-[#C85A32] hover:shadow-md transition-all text-center group flex flex-col items-center justify-center space-y-2"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-[#1E232A] group-hover:text-[#C85A32] transition-colors leading-snug">
                {cat.name}
              </h3>
              <span className="text-[11px] text-gray-500 font-medium">
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. FEATURED MASTER ARTISANS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C85A32] mb-1">
              National Treasures
            </div>
            <h2 className="text-2xl sm:text-3xl font-heritage font-bold text-[#1E232A]">
              Featured Master Craftspersons
            </h2>
          </div>
          <Link
            to="/artisans"
            className="text-xs sm:text-sm font-semibold text-[#C85A32] hover:underline flex items-center gap-1"
          >
            View all {artisans.length} verified artisans →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArtisans.map((artisan) => {
            const isFav = favorites.includes(artisan.id);
            return (
              <div
                key={artisan.id}
                className="bg-white rounded-2xl border border-[#E7DFCE] shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col group"
              >
                {/* Image & Badges */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={artisan.coverImage}
                    alt={artisan.craftSubtype}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleFavorite(artisan.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-gray-600 hover:text-[#C85A32] flex items-center justify-center shadow transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'text-[#C85A32] fill-current' : ''}`} />
                  </button>

                  {/* GI Tag Badge */}
                  {artisan.giTag && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#1B365D]/90 text-[#FAF7F2] text-[10px] font-semibold tracking-wide border border-white/20">
                      GI Tag: {artisan.giTag.number}
                    </div>
                  )}

                  {/* Artisan Mini Avatar & Location */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
                    <img
                      src={artisan.profileImage}
                      alt={artisan.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md shrink-0"
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
                      <p className="text-xs text-gray-200 truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#F3A628]" />
                        {artisan.village}, {artisan.state}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#C85A32]">
                        {artisan.craftSubtype}
                      </span>
                      <span className="text-gray-500 font-medium">
                        {artisan.experienceYears} Years Exp.
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {artisan.bio}
                    </p>

                    {/* Awards ribbon */}
                    {artisan.awards?.length > 0 && (
                      <div className="flex items-center gap-1.5 pt-1 text-xs text-[#1B365D] font-medium">
                        <Award className="w-3.5 h-3.5 text-[#F3A628]" />
                        <span className="truncate">{artisan.awards[0].name} ({artisan.awards[0].year})</span>
                      </div>
                    )}
                  </div>

                  {/* Actions: View & Direct Connect */}
                  <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between gap-2">
                    <Link
                      to={`/artisans/${artisan.id}`}
                      className="text-xs font-semibold text-[#1B365D] hover:text-[#C85A32] transition-colors"
                    >
                      View Dossier →
                    </Link>

                    <button
                      onClick={() => openInquiryModal(artisan)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF6EF] text-[#C85A32] hover:bg-[#C85A32] hover:text-white border border-[#C85A32]/30 text-xs font-medium transition-colors"
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
      </section>

      {/* 5. REGIONAL CRAFT ATLAS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF6EF] border border-[#E7DFCE] space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
                Geographical Heritage
              </span>
              <h2 className="text-2xl sm:text-3xl font-heritage font-bold text-[#1E232A]">
                India's Living Craft Geography
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
                Every district in India holds centuries of indigenous material knowledge. 
                Explore crafts by state, cluster, and cultural hubs.
              </p>
            </div>
            <Link
              to="/atlas"
              className="px-5 py-2.5 rounded-xl bg-[#1B365D] text-white text-xs sm:text-sm font-semibold hover:bg-[#10223D] transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <Compass className="w-4 h-4 text-[#F3A628]" />
              <span>Open Regional Atlas</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
            {[
              { state: 'Gujarat', hub: 'Kutch / Patan', tag: 'Rogan, Ajrakh, Patola' },
              { state: 'Jammu & Kashmir', hub: 'Kanihama / Srinagar', tag: 'Kani Shawls, Walnut' },
              { state: 'Bihar', hub: 'Madhubani / Ranti', tag: 'Mithila Painting' },
              { state: 'Karnataka', hub: 'Bidar / Channapatna', tag: 'Bidriware, Wood Toys' },
              { state: 'Odisha', hub: 'Raghurajpur / Puri', tag: 'Pattachitra, Applique' },
              { state: 'Rajasthan', hub: 'Jaipur / Molela', tag: 'Blue Pottery, Terracotta' }
            ].map((item) => (
              <Link
                key={item.state}
                to={`/artisans?state=${encodeURIComponent(item.state)}`}
                className="p-3.5 rounded-xl bg-white border border-[#E7DFCE] hover:border-[#C85A32] hover:shadow transition-all group"
              >
                <div className="text-xs font-bold text-[#1E232A] group-hover:text-[#C85A32] transition-colors">
                  {item.state}
                </div>
                <div className="text-[11px] text-[#C85A32] font-medium mt-0.5">
                  {item.hub}
                </div>
                <div className="text-[10px] text-gray-500 truncate mt-1">
                  {item.tag}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION: FIELD ONBOARDING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#C85A32] to-[#B33925] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-heritage font-bold">
              Know an Unsung Master Artisan?
            </h3>
            <p className="text-sm text-[#FAF6EF]/90 max-w-xl">
              Help us bridge the digital divide. Field officers, community members, and NGO workers 
              can nominate traditional craftspersons for verification and free listing.
            </p>
          </div>
          <Link
            to="/onboard"
            className="px-7 py-3 rounded-xl bg-white text-[#C85A32] font-semibold hover:bg-[#FAF6EF] shadow-md transition-colors text-sm shrink-0 flex items-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>Nominate an Artisan</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
