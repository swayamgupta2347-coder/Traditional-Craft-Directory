import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, ExternalLink, Award, Sparkles, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1E232A] text-[#FAF7F2] pt-16 pb-12 border-t-4 border-[#C85A32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-700/60">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C85A32] p-1.5 flex items-center justify-center text-white">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="4"/>
                  <path d="M50 18 L55 35 L72 35 L58 46 L63 64 L50 54 L37 64 L42 46 L28 35 L45 35 Z" fill="#FAF6EF"/>
                </svg>
              </div>
              <span className="font-heritage text-xl font-bold tracking-tight text-white">
                TRADITIONAL CRAFT DIRECTORY
              </span>
            </div>
            
            <p className="text-sm text-gray-300 leading-relaxed max-w-md">
              A centralized digital platform designed to document, promote, and make discoverable 
              India's traditional artisans and craft communities. Providing direct access to verified 
              artisan profiles, workshop addresses, and contact details with zero middleman commissions.
            </p>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10 max-w-md text-xs text-gray-300 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#F3A628] shrink-0 mt-0.5" />
              <span>
                <strong className="text-white">Zero-Middleman Pledge:</strong> We do not take cuts, commissions, or listing fees. 100% of proceeds go directly from patrons, researchers, and institutions to the craftspersons.
              </span>
            </div>
          </div>

          {/* Quick Directory Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heritage">
              Explore Directory
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/artisans" className="hover:text-[#F3A628] transition-colors">
                  All Master Artisans
                </Link>
              </li>
              <li>
                <Link to="/artisans?verifiedOnly=true" className="hover:text-[#F3A628] transition-colors">
                  Verified Padma & Shilp Gurus
                </Link>
              </li>
              <li>
                <Link to="/artisans?giOnly=true" className="hover:text-[#F3A628] transition-colors">
                  GI-Tagged Crafts Only
                </Link>
              </li>
              <li>
                <Link to="/crafts" className="hover:text-[#F3A628] transition-colors">
                  Crafts Encyclopedia
                </Link>
              </li>
              <li>
                <Link to="/atlas" className="hover:text-[#F3A628] transition-colors">
                  State & Regional Atlas
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Engagement */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heritage">
              Direct Connect
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/inquiries" className="hover:text-[#F3A628] transition-colors">
                  Direct Inquiries Log
                </Link>
              </li>
              <li>
                <Link to="/onboard" className="hover:text-[#F3A628] transition-colors">
                  Nominate an Artisan
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#F3A628] transition-colors">
                  Admin Verification Portal
                </Link>
              </li>
              <li>
                <Link to="/prd" className="hover:text-[#F3A628] transition-colors">
                  Product Documentation (PRD)
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional References */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heritage">
              Institutional Partners
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <a
                  href="https://texmin.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1"
                >
                  Ministry of Textiles, GoI <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://handicrafts.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1"
                >
                  DC (Handicrafts) Portal <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.unifiedmentor.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1"
                >
                  Unified Mentor <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://ipindia.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1"
                >
                  Geographical Indications Registry <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>
            © {new Date().getFullYear()} The Traditional Craft Directory. Documented for Cultural Preservation & Ethical Livelihoods.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/prd" className="hover:underline text-gray-300">
              PRD Specifications
            </Link>
            <span>•</span>
            <Link to="/admin" className="hover:underline text-gray-300">
              Admin Governance
            </Link>
            <span>•</span>
            <span className="text-[#F3A628] font-medium">Made for India's Artisans</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
