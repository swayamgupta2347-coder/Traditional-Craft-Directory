import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ShieldCheck, 
  Layers, 
  ExternalLink, 
  CheckCircle2, 
  Database, 
  Sparkles,
  BookOpen,
  Target,
  ArrowRight
} from 'lucide-react';

export default function PRDDocPage() {
  const [activeSection, setActiveSection] = useState('summary');

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([document.getElementById('prd-content')?.innerText || ''], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'The_Traditional_Craft_Directory_PRD.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="border-b border-[#E7DFCE] pb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
            <FileText className="w-4 h-4" />
            <span>Product Specifications & Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heritage font-bold text-[#1E232A]">
            Product Requirements Document (PRD)
          </h1>
          <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
            Official engineering, product, and cultural preservation documentation for The Traditional Craft Directory (TCD).
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B365D] text-white text-xs font-semibold hover:bg-[#10223D] shadow-sm transition-colors shrink-0"
        >
          <Download className="w-4 h-4 text-[#F3A628]" />
          <span>Download PRD Markdown</span>
        </button>
      </div>

      {/* Main Layout: Navigation + Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="space-y-2 md:col-span-1">
          <div className="p-4 bg-white rounded-2xl border border-[#E7DFCE] shadow-sm space-y-1 text-xs sticky top-28">
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
              PRD Sections
            </div>
            {[
              { id: 'summary', name: '1. Executive Summary', icon: Sparkles },
              { id: 'objectives', name: '2. Product Objectives', icon: Target },
              { id: 'scope', name: '3. Scope & Disintermediation', icon: Layers },
              { id: 'functional', name: '4. Functional Specifications', icon: CheckCircle2 },
              { id: 'tech', name: '5. Technical Architecture', icon: Database },
              { id: 'schema', name: '6. Data Models & Entities', icon: BookOpen },
              { id: 'governance', name: '7. Government & Partners', icon: ShieldCheck }
            ].map((sec) => {
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl font-medium flex items-center gap-2 transition-colors ${
                    activeSection === sec.id
                      ? 'bg-[#C85A32] text-white shadow-2xs'
                      : 'text-gray-700 hover:bg-[#FAF6EF]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{sec.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Viewer */}
        <div id="prd-content" className="md:col-span-3 bg-white p-6 sm:p-10 rounded-3xl border border-[#E7DFCE] shadow-sm space-y-8 text-sm text-gray-700 leading-relaxed">
          
          {/* SECTION: SUMMARY */}
          {activeSection === 'summary' && (
            <div className="space-y-6">
              <div className="border-b border-[#F2ECE1] pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32]">Section 1.0</span>
                <h2 className="text-2xl font-heritage font-bold text-[#1E232A]">Executive Summary & Problem Statement</h2>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF6EF] border border-[#E7DFCE] text-xs text-gray-800 space-y-2">
                <strong className="block text-[#1E232A] text-sm font-heritage">The Problem Statement:</strong>
                <p>Traditional Indian artisans face systemic, compounding hurdles:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li><strong>Limited digital presence & discoverability:</strong> Less than 10% of master artisans have indexed online portfolios.</li>
                  <li><strong>Heavy dependence on middlemen:</strong> Commercial intermediaries extract 60%–80% of final retail margins, leaving craftspersons economically vulnerable.</li>
                  <li><strong>Difficulty reaching genuine buyers & institutions:</strong> Disconnect from architects, international museum curators, and ethical bulk buyers.</li>
                  <li><strong>Lack of centralized, verified craft information:</strong> Proliferation of machine knockoffs and powerloom copies falsely marketed as handmade.</li>
                </ul>
              </div>

              <p>
                <strong>The Traditional Craft Directory (TCD)</strong> is a centralized, digital infrastructure engineered 
                to document, promote, and make discoverable India's traditional artisans and craft communities. By providing 
                direct access to artisan profiles, contact numbers, WhatsApp chats, and workshop locations, the platform restores 
                equitable pricing and economic self-reliance.
              </p>
            </div>
          )}

          {/* SECTION: OBJECTIVES */}
          {activeSection === 'objectives' && (
            <div className="space-y-6">
              <div className="border-b border-[#F2ECE1] pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32]">Section 2.0</span>
                <h2 className="text-2xl font-heritage font-bold text-[#1E232A]">Primary & Secondary Objectives</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#FAF6EF] border border-[#E7DFCE] space-y-2">
                  <h3 className="font-bold text-sm text-[#1E232A]">Primary Objectives</h3>
                  <ul className="text-xs space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                      <span>Create a centralized, verified digital directory of traditional artisans.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                      <span>Eliminate commercial intermediaries via direct phone and WhatsApp channels.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                      <span>Preserve endangered techniques and generational craft lores digitally.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                      <span>Provide authentic, government-referenced Geographical Indication data.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#E7DFCE] space-y-2">
                  <h3 className="font-bold text-sm text-[#1E232A]">Secondary Objectives</h3>
                  <ul className="text-xs space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Promote public and youth awareness of Indian cultural craftsmanship.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Facilitate direct institutional commissions for hotels, embassies, and museums.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Support rural livelihood sustainability without commercial platform cuts.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: SCOPE */}
          {activeSection === 'scope' && (
            <div className="space-y-6">
              <div className="border-b border-[#F2ECE1] pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32]">Section 3.0</span>
                <h2 className="text-2xl font-heritage font-bold text-[#1E232A]">Scope & Middleman Disintermediation</h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                  <strong>In Scope (Phase 1 - Fully Implemented):</strong>
                  <p>Web-based directory, faceted search (State, Craft, GI, Verification), comprehensive artisan profiles, direct inquiry & workshop scheduler, crafts encyclopedia, regional atlas, field nomination, and admin verification desk.</p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 space-y-1">
                  <strong>Out of Scope (Phase 1):</strong>
                  <p>Centralized cart/checkout (intentionally omitted to avoid commercial broker fees and preserve direct patron-to-artisan communication), third-party logistics/warehousing, and native mobile applications.</p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: FUNCTIONAL */}
          {activeSection === 'functional' && (
            <div className="space-y-6">
              <div className="border-b border-[#F2ECE1] pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32]">Section 4.0</span>
                <h2 className="text-2xl font-heritage font-bold text-[#1E232A]">Functional Requirements Specification</h2>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#FAF6EF] border border-[#E7DFCE] space-y-1">
                  <div className="font-bold text-[#1E232A]">FR-01: Multi-Faceted Directory & Search</div>
                  <p className="text-gray-600">Real-time full-text search across artisan names, crafts, villages, and techniques. Faceted filters for States, Craft Categories, GI status, and verified badges with responsive Grid/List toggles.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF6EF] border border-[#E7DFCE] space-y-1">
                  <div className="font-bold text-[#1E232A]">FR-02: Artisan Profile Dossier</div>
                  <p className="text-gray-600">Deep digital dossier containing verified biography, generational pedigree, workshop address with visiting hours, direct phone, WhatsApp link, high-res sample artwork gallery, and materials list.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF6EF] border border-[#E7DFCE] space-y-1">
                  <div className="font-bold text-[#1E232A]">FR-03: Zero-Commission Direct Inquiries</div>
                  <p className="text-gray-600">Modal allowing patrons to request custom orders, institutional quotes, or schedule in-person workshop visits with ₹0.00 platform commission.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF6EF] border border-[#E7DFCE] space-y-1">
                  <div className="font-bold text-[#1E232A]">FR-04: Admin Verification Console</div>
                  <p className="text-gray-600">Capability to review pending field nominations, issue or revoke official verification badges, perform CRUD updates on artisan profiles, and monitor direct connection KPIs.</p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: TECH ARCHITECTURE */}
          {activeSection === 'tech' && (
            <div className="space-y-6">
              <div className="border-b border-[#F2ECE1] pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32]">Section 5.0</span>
                <h2 className="text-2xl font-heritage font-bold text-[#1E232A]">Technical Architecture & Non-Functional Specs</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#FAF6EF] border border-[#E7DFCE] space-y-1">
                  <div className="font-bold text-[#1E232A]">Frontend Architecture</div>
                  <p className="text-gray-600">React 18 + Vite, Tailwind CSS with customized heritage color scheme, Lucide Icons, and React Router 6. Fully responsive across mobile, tablet, and desktop.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF6EF] border border-[#E7DFCE] space-y-1">
                  <div className="font-bold text-[#1E232A]">Backend & API</div>
                  <p className="text-gray-600">Node.js Express REST API running on port 5001, providing endpoints for artisan queries, direct inquiries, nominations, and KPI telemetry.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF6EF] border border-[#E7DFCE] space-y-1">
                  <div className="font-bold text-[#1E232A]">Resilience & Offline Layer</div>
                  <p className="text-gray-600">Dual-layer state engine: connects seamlessly to live Express REST backend when available, and falls back to browser LocalStorage persistence for uninterrupted offline demonstrations.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF6EF] border border-[#E7DFCE] space-y-1">
                  <div className="font-bold text-[#1E232A]">Performance Benchmarks</div>
                  <p className="text-gray-600">Sub-second page rendering, zero screen flicker during facet filtering, accessible typography (Cinzel & Plus Jakarta Sans), and zero runtime dependencies on external CDNs.</p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: DATA SCHEMA */}
          {activeSection === 'schema' && (
            <div className="space-y-6">
              <div className="border-b border-[#F2ECE1] pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32]">Section 6.0</span>
                <h2 className="text-2xl font-heritage font-bold text-[#1E232A]">Data Schema & Entity Models</h2>
              </div>

              <div className="p-4 rounded-2xl bg-gray-900 text-gray-200 text-xs font-mono overflow-x-auto space-y-2">
                <div className="text-[#F3A628]">// Artisan Entity Model</div>
                <pre>{`{
  "id": "art-001",
  "name": "Abdul Gafur Khatri",
  "title": "8th Generation Rogan Art Master Craftsperson",
  "craftCategory": "Textiles & Painting",
  "craftSubtype": "Rogan Art",
  "state": "Gujarat",
  "district": "Kutch",
  "village": "Nirona",
  "experienceYears": 44,
  "awards": [{ "name": "Padma Shri", "year": 2019, "authority": "President of India" }],
  "verificationStatus": "Verified",
  "verifiedBy": "Development Commissioner (Handicrafts), Ministry of Textiles",
  "giTag": { "status": "Registered", "number": "GI-598", "title": "Rogan Art of Gujarat" },
  "workshop": {
    "name": "Khatri Rogan Art Heritage Studio",
    "address": "Opposite Panchayat Bhavan, Village Nirona",
    "visitingHours": "09:00 AM - 06:30 PM",
    "workshopVisitsAllowed": true
  },
  "contact": { "phone": "+91 94269 84521", "whatsapp": "+91 94269 84521" },
  "priceRange": "₹2,500 - ₹1,50,000"
}`}</pre>
              </div>
            </div>
          )}

          {/* SECTION: GOVERNANCE & PARTNERS */}
          {activeSection === 'governance' && (
            <div className="space-y-6">
              <div className="border-b border-[#F2ECE1] pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32]">Section 7.0</span>
                <h2 className="text-2xl font-heritage font-bold text-[#1E232A]">Government References & Institutional Standards</h2>
              </div>

              <p className="text-xs sm:text-sm text-gray-600">
                All data collected and displayed complies with verified public archives, including:
              </p>

              <div className="space-y-2 text-xs">
                <a
                  href="https://texmin.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#FAF6EF] border border-[#E7DFCE] flex items-center justify-between hover:border-[#C85A32] transition-colors"
                >
                  <span className="font-semibold text-[#1E232A]">Ministry of Textiles, Government of India</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>

                <a
                  href="https://handicrafts.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#FAF6EF] border border-[#E7DFCE] flex items-center justify-between hover:border-[#C85A32] transition-colors"
                >
                  <span className="font-semibold text-[#1E232A]">Office of the Development Commissioner (Handicrafts)</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>

                <a
                  href="https://ipindia.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#FAF6EF] border border-[#E7DFCE] flex items-center justify-between hover:border-[#C85A32] transition-colors"
                >
                  <span className="font-semibold text-[#1E232A]">Geographical Indications Registry (Intellectual Property India)</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>

                <a
                  href="https://www.unifiedmentor.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#FAF6EF] border border-[#E7DFCE] flex items-center justify-between hover:border-[#C85A32] transition-colors"
                >
                  <span className="font-semibold text-[#1E232A]">Unified Mentor Project Guidance</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
