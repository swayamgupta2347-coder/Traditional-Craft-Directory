import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Calculator, 
  Sparkles, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Layers, 
  ArrowRight,
  TrendingDown
} from 'lucide-react';

const CRAFT_CALCULATOR_PRESETS = [
  {
    name: 'Kani Jamawar Pashmina Shawl',
    category: 'Textiles & Weaving',
    baseDays: 180,
    basePrice: 55000,
    brokerMarkupPercent: 80,
    materials: '100% Changthangi Ladakh Pashmina (12 microns), hand-spun Talim warp',
    artisanName: 'Ghulam Hassan Mir',
    artisanId: 'art-005'
  },
  {
    name: 'Bidriware Silver Inlay Royal Ewer (Aftaba)',
    category: 'Metalwork',
    baseDays: 45,
    basePrice: 18000,
    brokerMarkupPercent: 70,
    materials: 'Copper-Zinc alloy (1:16), 99.9% fine silver wire, Bidar Fort soil',
    artisanName: 'Shah Rasheed Ahmed Quadri',
    artisanId: 'art-003'
  },
  {
    name: 'Jaipur Blue Pottery Architectural Tile Set (12x12)',
    category: 'Ceramics & Pottery',
    baseDays: 25,
    basePrice: 8500,
    brokerMarkupPercent: 65,
    materials: 'Quartz stone powder, Fuller’s earth, Katira gum, Cobalt & Copper oxides',
    artisanName: 'Girraj Prasad Kumhar',
    artisanId: 'art-004'
  },
  {
    name: 'Madhubani Bharni Mythological Mural Canvas',
    category: 'Traditional Painting',
    baseDays: 30,
    basePrice: 12000,
    brokerMarkupPercent: 75,
    materials: 'Cow-dung washed handmade rag paper, bamboo twig pens, natural mineral dyes',
    artisanName: 'Baua Devi',
    artisanId: 'art-002'
  },
  {
    name: 'Rogan Art Symmetrical Tree of Life Silk Stole',
    category: 'Textiles & Painting',
    baseDays: 40,
    basePrice: 22000,
    brokerMarkupPercent: 85,
    materials: 'Boiled castor oil paste, metal stylus, natural earth pigments, Ahir silk',
    artisanName: 'Abdul Gafur Khatri',
    artisanId: 'art-001'
  },
  {
    name: 'Dokra Lost-Wax Bell Metal Musician Ensemble',
    category: 'Metalwork',
    baseDays: 35,
    basePrice: 9500,
    brokerMarkupPercent: 70,
    materials: 'Clay ant-hill core, dammar resin beeswax threads, molten scrap bronze',
    artisanName: 'Bikash Biswas & Kalpana Karmakar',
    artisanId: 'art-010'
  }
];

export default function CraftCalculatorWidget() {
  const { artisans, openInquiryModal } = useData();

  const [selectedCraftIndex, setSelectedCraftIndex] = useState(0);
  const [scaleMultiplier, setScaleMultiplier] = useState(1); // 1 = Standard, 1.8 = Large, 2.8 = Masterpiece
  const [urgency, setUrgency] = useState(1); // 1 = Traditional Pace, 1.2 = Priority Workshop Batch

  const craft = CRAFT_CALCULATOR_PRESETS[selectedCraftIndex];

  // Calculated estimates
  const estimatedDays = Math.round(craft.baseDays * scaleMultiplier);
  const fairArtisanPrice = Math.round(craft.basePrice * scaleMultiplier * urgency);
  const estimatedBrokerRetailPrice = Math.round(fairArtisanPrice * (1 + craft.brokerMarkupPercent / 100));
  const middlemanSaved = estimatedBrokerRetailPrice - fairArtisanPrice;

  const targetArtisan = artisans.find(a => a.id === craft.artisanId) || artisans[0];

  return (
    <div className="bg-gradient-to-br from-[#1B365D] via-[#10223D] to-[#2E1A47] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-amber-400/40 space-y-8 relative overflow-hidden">
      {/* Decorative radial glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Widget Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Tool</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-heritage font-bold text-white">
            Direct Craft Commission & Savings Estimator
          </h3>
          <p className="text-xs sm:text-sm text-gray-300">
            Select a craft discipline and scale to calculate realistic artisan working days, fair maker compensation, and eliminated middleman markups.
          </p>
        </div>

        <div className="text-right shrink-0">
          <div className="text-[11px] text-emerald-300 uppercase tracking-wider font-semibold">
            Direct Model Transparency
          </div>
          <div className="text-xl sm:text-2xl font-heritage font-bold text-emerald-400">
            100% Direct to Artisan
          </div>
        </div>
      </div>

      {/* Interactive Controls & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Inputs (5 Cols) */}
        <div className="lg:col-span-5 space-y-5 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
          
          {/* Craft Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
              1. Select Heritage Craft Form
            </label>
            <select
              value={selectedCraftIndex}
              onChange={(e) => setSelectedCraftIndex(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F172A] border border-white/20 text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-amber-400"
            >
              {CRAFT_CALCULATOR_PRESETS.map((item, idx) => (
                <option key={idx} value={idx}>
                  {item.name} ({item.category})
                </option>
              ))}
            </select>
          </div>

          {/* Scale / Dimension Toggle */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
              2. Dimension / Complexity Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Standard', mult: 1, desc: 'Bespoke Piece' },
                { label: 'Grand', mult: 1.8, desc: 'Heirloom Suite' },
                { label: 'Museum', mult: 2.8, desc: 'Masterpiece' }
              ].map((s) => (
                <button
                  type="button"
                  key={s.label}
                  onClick={() => setScaleMultiplier(s.mult)}
                  className={`p-2.5 rounded-xl text-xs font-bold text-center border transition-all ${
                    scaleMultiplier === s.mult
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white border-amber-300 shadow-md'
                      : 'bg-[#0F172A]/60 text-gray-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  <div>{s.label}</div>
                  <div className="text-[10px] font-normal text-gray-300">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Materials Note */}
          <div className="p-3 rounded-xl bg-black/30 border border-white/10 text-xs space-y-1">
            <div className="text-amber-400 font-semibold text-[11px] uppercase">
              Indigenous Raw Materials Required:
            </div>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              {craft.materials}
            </p>
          </div>
        </div>

        {/* Right Output Panel (7 Cols) */}
        <div className="lg:col-span-7 space-y-6 bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-rose-500/10 p-6 sm:p-8 rounded-3xl border-2 border-amber-400/40 backdrop-blur-md">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Handcrafting Time Card */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold uppercase">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Estimated Artisan Days</span>
              </div>
              <div className="text-3xl font-heritage font-bold text-white">
                ~{estimatedDays} <span className="text-sm font-normal text-gray-300">working days</span>
              </div>
              <p className="text-[11px] text-gray-400">
                100% uninterrupted manual handcrafting
              </p>
            </div>

            {/* Direct Fair Price Card */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold uppercase">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Direct Artisan Quote</span>
              </div>
              <div className="text-3xl font-heritage font-bold text-emerald-400">
                ₹{fairArtisanPrice.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-emerald-300">
                100% direct remuneration to master artisan
              </p>
            </div>

          </div>

          {/* Middleman Savings Visualizer */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-emerald-900/60 border border-emerald-500/50 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-300 uppercase tracking-wide flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4" />
                Commercial Intermediary Markup Avoided
              </span>
              <span className="font-heritage font-bold text-amber-300 text-sm">
                +₹{middlemanSaved.toLocaleString('en-IN')} Saved!
              </span>
            </div>

            <div className="w-full bg-black/40 h-3 rounded-full overflow-hidden flex">
              <div 
                className="bg-emerald-400 h-full" 
                style={{ width: `${Math.round((fairArtisanPrice / estimatedBrokerRetailPrice) * 100)}%` }} 
                title="Direct Artisan Share"
              ></div>
              <div 
                className="bg-red-500/80 h-full" 
                style={{ width: `${Math.round((middlemanSaved / estimatedBrokerRetailPrice) * 100)}%` }} 
                title="Middleman Commission Eliminated"
              ></div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-300 pt-1">
              <span>Standard Retail Boutique Estimate: <strike className="text-red-400">₹{estimatedBrokerRetailPrice.toLocaleString('en-IN')}</strike></span>
              <span className="text-emerald-300 font-bold">Platform Fee: ₹0.00</span>
            </div>
          </div>

          {/* Direct Commission CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-gray-300">
              Matched Master: <strong className="text-white">{targetArtisan.name}</strong> ({targetArtisan.village}, {targetArtisan.state})
            </div>

            <button
              onClick={() => openInquiryModal(targetArtisan)}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-orange-500 hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Directly Commission This Piece (0% Fee)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
