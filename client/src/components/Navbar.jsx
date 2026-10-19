import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
  Sparkles, 
  MapPin, 
  BookOpen, 
  ShieldCheck, 
  Heart, 
  Menu, 
  X, 
  UserCheck, 
  FileText, 
  MessageSquare, 
  Compass, 
  Search,
  Layers
} from 'lucide-react';

export default function Navbar() {
  const { favorites, artisans, stats, compareList, openCompareModal } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Directory', path: '/artisans', icon: Search },
    { name: 'Crafts Heritage', path: '/crafts', icon: BookOpen },
    { name: 'Regional Atlas', path: '/atlas', icon: Compass },
    { name: 'Direct Connect', path: '/inquiries', icon: MessageSquare },
    { name: 'Nominate', path: '/onboard', icon: UserCheck },
    { name: 'PRD Docs', path: '/prd', icon: FileText }
  ];

  const bookmarkedArtisans = artisans.filter(a => favorites.includes(a.id));

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-300/40 shadow-sm">
      {/* Top Heritage Notice Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-[#FAF7F2] text-xs py-1.5 px-4 border-b border-amber-400/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#F3A628] animate-pulse"></span>
            <span className="font-medium tracking-wide">
              Documenting, Promoting & Direct Connection for India's Traditional Artisans
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[#E7DFCE]">
            <span>Middleman Commission: <strong className="text-amber-400 font-bold">0%</strong></span>
            <span>•</span>
            <span>Verified Masters: <strong className="text-white font-bold">{stats.verifiedArtisans}</strong></span>
            <span>•</span>
            <span>States: <strong className="text-white font-bold">{stats.uniqueStates}</strong></span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C85A32] to-[#B33925] p-2 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="3 3"/>
                <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="3"/>
                <path d="M50 18 L55 35 L72 35 L58 46 L63 64 L50 54 L37 64 L42 46 L28 35 L45 35 Z" fill="#FAF6EF"/>
                <circle cx="50" cy="50" r="6" fill="#F3A628"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heritage text-xl sm:text-2xl font-bold tracking-tight text-[#1E232A]">
                  TRADITIONAL CRAFT
                </span>
                <span className="hidden sm:inline-block text-xs font-semibold px-1.5 py-0.5 rounded bg-[#FAF6EF] text-[#C85A32] border border-[#C85A32]/30">
                  INDIA
                </span>
              </div>
              <p className="text-xs text-[#6B7280] tracking-wider uppercase font-medium">
                Centralized Artisan Directory & Heritage Registry
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-[#C85A32] text-white shadow-sm'
                      : 'text-[#374151] hover:text-[#C85A32] hover:bg-[#FAF6EF]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Compare Quick Action */}
            {compareList.length > 0 && (
              <button
                type="button"
                onClick={openCompareModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-bold shadow-md transition-all animate-bounce"
                title="View side-by-side artisan comparison matrix"
              >
                <Layers className="w-3.5 h-3.5 text-slate-950" />
                <span className="hidden sm:inline">Compare</span>
                <span className="w-4 h-4 rounded-full bg-slate-950 text-amber-300 text-[10px] font-black flex items-center justify-center">
                  {compareList.length}
                </span>
              </button>
            )}

            {/* Favorites Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setFavoritesOpen(!favoritesOpen)}
                className="relative p-2.5 rounded-lg text-[#374151] hover:text-[#C85A32] hover:bg-[#FAF6EF] transition-colors"
                title="Saved Artisans"
              >
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C85A32] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* Favorites Drawer / Popover */}
              {favoritesOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-[#E7DFCE] p-4 z-50 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE1]">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-[#C85A32] fill-current" />
                      <h4 className="font-semibold text-sm text-[#1E232A]">Saved Artisans ({favorites.length})</h4>
                    </div>
                    <button
                      onClick={() => setFavoritesOpen(false)}
                      className="text-gray-400 hover:text-gray-600 text-xs"
                    >
                      Close
                    </button>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-[#F2ECE1] mt-2">
                    {bookmarkedArtisans.length === 0 ? (
                      <p className="py-6 text-center text-xs text-gray-500">
                        No artisans bookmarked yet. Click the heart icon on any artisan profile to save.
                      </p>
                    ) : (
                      bookmarkedArtisans.map((artisan) => (
                        <div key={artisan.id} className="py-3 flex items-center gap-3 hover:bg-[#FAF6EF] p-2 rounded-lg transition-colors">
                          <img
                            src={artisan.profileImage}
                            alt={artisan.name}
                            className="w-10 h-10 rounded-full object-cover border border-[#E7DFCE]"
                          />
                          <div className="flex-1 min-w-0">
                            <Link
                              to={`/artisans/${artisan.id}`}
                              onClick={() => setFavoritesOpen(false)}
                              className="text-xs font-semibold text-[#1E232A] hover:text-[#C85A32] truncate block"
                            >
                              {artisan.name}
                            </Link>
                            <p className="text-[11px] text-gray-500 truncate">{artisan.craftSubtype} • {artisan.state}</p>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
                            Verified
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                  {bookmarkedArtisans.length > 0 && (
                    <div className="pt-3 border-t border-[#F2ECE1] text-center">
                      <Link
                        to="/artisans"
                        onClick={() => setFavoritesOpen(false)}
                        className="text-xs font-semibold text-[#C85A32] hover:underline"
                      >
                        Explore all in directory →
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Admin Portal Pill */}
            <Link
              to="/admin"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#1B365D] text-white hover:bg-[#10223D] transition-colors shadow-sm"
              title="Admin & Verification Console"
            >
              <ShieldCheck className="w-4 h-4 text-[#F3A628]" />
              <span className="hidden sm:inline">Admin</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-[#FAF7F2]/20 rounded font-mono">
                {stats.pendingNominations > 0 ? `${stats.pendingNominations} pending` : 'Portal'}
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-[#FAF6EF]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E7DFCE] px-4 pt-2 pb-6 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                  active
                    ? 'bg-[#C85A32] text-white'
                    : 'text-gray-700 hover:bg-[#FAF6EF]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.name}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600 px-3">
            <span>Admin Status: Verified Portal</span>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#C85A32] font-semibold"
            >
              Open Dashboard →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
